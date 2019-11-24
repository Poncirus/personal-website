/********************************************************************
    file:   delete-article.go
    brief:  delete article (md file)
********************************************************************/
package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"path/filepath"

	"./database"
	"github.com/tidwall/gjson"
)

// DeleteArticleResponse response send to JS
type DeleteArticleResponse struct {
	Result string
	Str    string
}

/********************************************************************
	func:   deleteArticle
	brief:  delete markdown file
	args:   w - responseWriter
			r - request
	return:
********************************************************************/
func deleteArticle(w http.ResponseWriter, r *http.Request) {
	fmt.Println("-----------------------------------Delete Article------------------------------------")

	// get dir
	dir, err := filepath.Abs(filepath.Dir(os.Args[0]))
	if err != nil {
		fmt.Println(err)
	}
	dir = dir + gjson.Get(Config, "markdown.fileRoot").String()

	// get request
	r.ParseForm()
	form := r.Form
	username := form["username"][0]
	password := form["password"][0]
	title := form["title"][0]

	// log
	fmt.Println("username: ", username, ", title: ", title)

	var response DeleteArticleResponse

	// check password
	if !database.CheckPassword(username, password) {
		response.Result = "Fail"
		response.Str = "Log in information invalid"
	} else if title == "" {
		response.Result = "Fail"
		response.Str = "Title cannot be empty"
	} else {
		e := false // =True if error

		dir = dir + title + "/"
		_, err := os.Stat(dir)

		// check path exist
		if err != nil {
			response.Result = "Fail"
			response.Str = "File do not exist"
			fmt.Println("File do not exist")
		} else {
			// remove dir
			err = os.RemoveAll(dir)
			if err != nil {
				fmt.Println(err)
				e = true
			}

			if e {
				response.Result = "Fail"
				response.Str = "Server error"
			} else {
				response.Result = "Success"
				response.Str = "File has been deleted"
			}
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
