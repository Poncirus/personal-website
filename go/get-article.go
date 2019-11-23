/********************************************************************
    file:   get-article.go
    brief:  get article info
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

// GetArticleResponse response send to JS
type GetArticleResponse struct {
	Result      string
	Str         string
	Title       string
	Description string
	Markdown    string
}

/********************************************************************
	func:   getArticle
	brief:  get article info
	args:   w - responseWriter
			r - request
	return:
********************************************************************/
func getArticle(w http.ResponseWriter, r *http.Request) {
	fmt.Println("-------------------------------------Get Article-------------------------------------")

	// get dir
	dir, err := filepath.Abs(filepath.Dir(os.Args[0]))
	if err != nil {
		fmt.Println(err)
	}
	dir = dir + "/../static/markdown/"

	// get request
	r.ParseForm()
	form := r.Form
	title := form["title"][0]

	// log
	fmt.Println("title: ", title)

	var response GetArticleResponse

	// check password
	if title == "" {
		response.Result = "Fail"
		response.Str = "Title cannot be empty"
	} else {
		e := false // =True if error

		// read description
		des, err := ioutil.ReadFile(dir + title + "/description.md")
		if err != nil {
			fmt.Println(err)
			e = true
		}

		// read markdown
		md, err := ioutil.ReadFile(dir + title + "/" + title + ".md")
		if err != nil {
			fmt.Println(err)
			e = true
		}

		if e {
			response.Result = "Fail"
			response.Str = "Server error"
		} else {
			response.Result = "Success"
			response.Str = "Success"
			response.Title = title
			response.Description = string(des)
			response.Markdown = string(md)
		}
	}

	// return
	jsonByte, err := json.Marshal(response)
	if err != nil {
		fmt.Println("error: ", err)
	}
	fmt.Fprintf(w, string(jsonByte))

	fmt.Println("-------------------------------------------------------------------------------------")
}
