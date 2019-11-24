/********************************************************************
    file:   main.go
    brief:  go web server
********************************************************************/

package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/tidwall/gjson"
)

// ConfigFile config file name
var ConfigFile string = "config.json"

// Config config json string
var Config string

/********************************************************************
    func:   defaultRoute
    brief:  return 404 and message
    args:   w - request ResponseWriter
            r - request
    return:
********************************************************************/
func defaultRoute(w http.ResponseWriter, r *http.Request) {
	fmt.Println("---------------------------------Command Not Found-----------------------------------")
	http.Error(w, "go server command not found", 404)
	fmt.Println("-------------------------------------------------------------------------------------")

}

func main() {
	// read config
	if !initConfig() {
		return
	}

	// set route
	http.HandleFunc("/", defaultRoute)
	http.HandleFunc("/go/notice-search", noticeSearch)
	http.HandleFunc("/go/sign-in", signIn)
	http.HandleFunc("/go/save-article", saveArticle)
	http.HandleFunc("/go/delete-article", deleteArticle)
	http.HandleFunc("/go/get-article-list", getArticleList)
	http.HandleFunc("/go/get-article", getArticle)
	http.HandleFunc("/go/image-upload", imageUpload)

	// set listen port
	port := gjson.Get(Config, "web.port").String()
	fmt.Println("Start web server at port " + port)
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

// initConfig read config from config.json and store in CONFIG
func initConfig() bool {
	// get dir
	dir, err := filepath.Abs(filepath.Dir(os.Args[0]))
	if err != nil {
		fmt.Println(err)
	}
	dir = dir + "/" + ConfigFile

	// read description
	file, err := ioutil.ReadFile(dir)
	if err != nil {
		fmt.Println(err)
		return false
	}

	Config = string(file)
	return true
}
