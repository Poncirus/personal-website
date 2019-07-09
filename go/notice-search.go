/********************************************************************
    file:   notice-search.go
    brief:  search article from website JuChao
********************************************************************/
package main

import "encoding/json"
import "fmt"
import "io/ioutil"
import "net/http"
import "net/url"
import "strings"

// json structure for stock info from juchao
// the first letter must be upper-case
type StockInfo struct {
	OrgId    string
	Category string
	Code     string
	Pinyin   string
	Zwjc     string
}

// announcement structure
type Anno struct {
	AnnouncementTitle string
	AnnouncementTime  int
	AdjunctUrl        string
	AdjunctSize       int
}

// json structure for announcement search from juchao
type AnnoSearch struct {
	Key               string
	TotalAnnouncement int
	Announcements     []Anno
}

// correspond to alert in JS
// status must be (success, warning, danger)
type Alert struct {
	Str    string
	Status string
}

// correspond to announcement in JS
type Announcement struct {
	Info StockInfo
	Ban  []string
	Anno []AnnoSearch
}

// response send to JS
type JsonResponse struct {
	Alert []Alert
	Stock []Announcement
}

/********************************************************************
    func:   noticeSearch
    brief:  search article from website JuChao
	args:   w - responseWriter
			r - request
    return:
********************************************************************/
func noticeSearch(w http.ResponseWriter, r *http.Request) {
	fmt.Println("------------------------------------Notice Search------------------------------------")

	// get request
	r.ParseForm()
	form := r.Form
	companyList := form["company_list"][0] // form[] is []string
	keyWords := form["key_words"][0]
	banWords := form["ban_words"][0]

	// log
	fmt.Println("company list: ", companyList, ", key words: ", keyWords, ", ban words: ", banWords)

	// convert string(split with space) to []string
	company := strings.Fields(companyList)
	key := strings.Fields(keyWords)
	ban := strings.Fields(banWords)

	//Json struct
	var alert []Alert
	var stock []Announcement

	for _, c := range company {
		info := stockInfoGet(c)

		// cannot find c
		if info == nil {
			alert = append(alert, Alert{"Cannot find stock information for " + c, "danger"})
			continue
		}

		fmt.Println("Search result:", *info)

		// name searched and result are different
		if info.Zwjc != c {
			alert = append(alert, Alert{"Searching for " + c + ", but the result is " + info.Zwjc, "warning"})
		}

		var anno []AnnoSearch
		for _, k := range key {
			a := pdfListGet(*info, k, ban)

			if a.TotalAnnouncement > 50 {
				// result is too long
				alert = append(alert, Alert{"Not all results are shown while searching for " + c, "warning"})
			}

			anno = append(anno, *a)
		}

		stock = append(stock, Announcement{*info, ban, anno})
	}

	// set output
	var jsonResponse JsonResponse = JsonResponse{alert, stock}
	jsonByte, err := json.Marshal(jsonResponse)
	if err != nil {
		fmt.Println("error: ", err)
	}
	fmt.Fprintf(w, string(jsonByte))

	fmt.Println("Return:", string(jsonByte))
	fmt.Println("-------------------------------------------------------------------------------------")
}

/********************************************************************
    func:   stockInfoGet
    brief:  get stock information (orgId & code)
    args:   name - stock name
    return: stock information
********************************************************************/
func stockInfoGet(name string) *StockInfo {
	name = strings.ToLower(name) // convert characters to lower
	name = url.QueryEscape(name) // parse url

	// parse http request
	urlPost := "http://www.cninfo.com.cn/new/information/topSearch/query"
	payload := strings.NewReader("keyWord=" + name + "&maxNum=11")
	req, _ := http.NewRequest("POST", urlPost, payload)

	req.Header.Add("Accept", "application/json, text/javascript, */*; q=0.01")
	req.Header.Add("Accept-Language", "zh-Hans-CN, zh-Hans; q=0.8, en-US; q=0.5, en; q=0.3")
	req.Header.Add("Cache-Control", "no-cache")
	req.Header.Add("Connection", "Keep-Alive")
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
	req.Header.Add("Host", "www.cninfo.com.cn")
	req.Header.Add("Origin", "http://www.cninfo.com.cn")
	req.Header.Add("Referer", "http://www.cninfo.com.cn/new/fulltextSearch?notautosubmit=&keyWord="+name)
	req.Header.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134")
	req.Header.Add("X-Requested-With", "XMLHttpRequest")
	req.Header.Add("cache-control", "no-cache")
	req.Header.Add("Postman-Token", "a63d8f97-c706-4846-9dce-b7bc8745ea06")

	// http request
	res, err := http.DefaultClient.Do(req)

	if err != nil {
		fmt.Println("error: ", err)
		fmt.Println("http connection fail in stockInfoGet while excute ", name)
		return nil
	}

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	// decode json response
	var stock []StockInfo
	err = json.Unmarshal(body, &stock)
	if err != nil {
		fmt.Println("error: ", err)
		fmt.Println("decode json response in stockInfoGet while excute ", name)
		return nil
	}

	// the first one is the result
	result := stock[0]
	return &result
}

/********************************************************************
    func:   pdfListGet
    brief:  get pdf list with key words and without ban words
	args:   info - stock information
			key - key words
			ban - ban words
    return: announcements
********************************************************************/
func pdfListGet(info StockInfo, key string, ban []string) *AnnoSearch {
	var res *AnnoSearch

	if strings.HasPrefix(info.Code, "0") || strings.HasPrefix(info.Code, "3") {
		// try to get pdf list from shenzhen
		res = pdfListGetHttp(info, key, "szse", "sz")
	} else {
		// try to get pdf list from shanghai
		res = pdfListGetHttp(info, key, "sse", "shmb")
	}

	// remove ban word
	for _, b := range ban {
		for i, t := range res.Announcements {
			if strings.Contains(t.AnnouncementTitle, b) {
				res.Announcements = append(res.Announcements[:i], res.Announcements[i+1:]...)
			}
		}
	}

	return res
}

/********************************************************************
    func:   pdfListGet
    brief:  get pdf list with key words and without ban words
	args:   info - stock information
			key - key words
			column - search key (sse, szse)
			plate - search key (shmb, sz)
    return: announcements
********************************************************************/
func pdfListGetHttp(info StockInfo, key string, column string, plate string) *AnnoSearch {

	// parse http request
	urlPost := "http://www.cninfo.com.cn/new/hisAnnouncement/query"

	payload := strings.NewReader("pageNum=1&pageSize=50&tabName=fulltext&column=" + column + "&stock=" + info.Code + "%2C" + info.OrgId + "&searchkey=" + url.QueryEscape(key) + "%3B&secid=&plate=" + plate + "&category=&trade=&seDate=2000-01-01~2099-03-01")

	req, _ := http.NewRequest("POST", urlPost, payload)

	req.Header.Add("Accept", "application/json, text/javascript, */*; q=0.01")
	req.Header.Add("Accept-Language", "zh-Hans-CN, zh-Hans; q=0.8, en-US; q=0.5, en; q=0.3")
	req.Header.Add("Cache-Control", "no-cache")
	req.Header.Add("Connection", "Keep-Alive")
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
	req.Header.Add("Host", "www.cninfo.com.cn")
	req.Header.Add("Origin", "http://www.cninfo.com.cn")
	req.Header.Add("Referer", "http://www.cninfo.com.cn/new/disclosure/stock?orgId="+info.OrgId+"&stockCode="+info.Code)
	req.Header.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134")
	req.Header.Add("X-Requested-With", "XMLHttpRequest")
	req.Header.Add("cache-control", "no-cache")

	// http request
	res, err := http.DefaultClient.Do(req)

	if err != nil {
		fmt.Println("error: ", err)
		fmt.Println("http connection fail in pdfListGetHttp")
		return nil
	}

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	// decode json response
	var anno AnnoSearch
	err = json.Unmarshal(body, &anno)
	if err != nil {
		fmt.Println("error: ", err)
		fmt.Println("decode json response in pdfListGetHttp")
		return nil
	}

	// add key
	anno.Key = key

	return &anno
}
