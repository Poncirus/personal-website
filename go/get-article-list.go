/********************************************************************
    file:   get-article-list.go
    brief:  get name and description of articles
********************************************************************/
package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
)

// article info structure
type ArticleInfo struct {
	Title       string
	Description string
}

// response send to JS
type GetArticleListResponse struct {
	Result      string
	ArticleInfo []ArticleInfo
}

/********************************************************************
	func:   getArticleList
	brief:  get markdown file list
	args:   w - responseWriter
			r - request
	return:
********************************************************************/
func getArticleList(w http.ResponseWriter, r *http.Request) {
	fmt.Println("----------------------------------Get Article List-----------------------------------")

	// get dir
	dir, err := filepath.Abs(filepath.Dir(os.Args[0]))
	if err != nil {
		fmt.Println(err)
	}
	dir = dir + "/../static/markdown/"

	var response GetArticleListResponse

	e := false // =True if error

	// open folder
	file, err := os.Open(dir)
	if err != nil {
		fmt.Println(err)
		e = true
	}

	// read path
	fileInfo, err := file.Readdir(0)
	if err != nil {
		fmt.Println(err)
		e = true
	}

	for _, fi := range fileInfo {
		if !fi.IsDir() {
			continue
		}

		var ai ArticleInfo

		// read description
		des, err := ioutil.ReadFile(dir + fi.Name() + "/description.md")
		if err != nil {
			fmt.Println(err)
			e = true
		}

		ai.Title = fi.Name()
		ai.Description = string(des)
		response.ArticleInfo = append(response.ArticleInfo, ai)
	}

	// set Result
	if e {
		response.Result = "Fail"
	} else {
		response.Result = "Success"
	}

	// return
	jsonByte, err := json.Marshal(response)
	if err != nil {
		fmt.Println("error: ", err)
	}
	fmt.Fprintf(w, string(jsonByte))

	fmt.Println("-------------------------------------------------------------------------------------")
}
