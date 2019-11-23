/********************************************************************
    file:   save-article.go
    brief:  save article (md file)
********************************************************************/
package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"path/filepath"

	"./database"
)

// response send to JS
type SaveArticleResponse struct {
	Result string
	Str    string
}

/********************************************************************
	func:   saveArticle
	brief:  save markdown file
	args:   w - responseWriter
			r - request
	return:
********************************************************************/
func saveArticle(w http.ResponseWriter, r *http.Request) {
	fmt.Println("------------------------------------Save Article-------------------------------------")

	// get dir
	d, err := filepath.Abs(filepath.Dir(os.Args[0]))
	if err != nil {
		fmt.Println(err)
	}
	d = d + "/../static/markdown/"

	// get request
	r.ParseForm()
	form := r.Form
	username := form["username"][0]
	password := form["password"][0]
	title := form["title"][0]
	description := form["description"][0]
	md := form["markdown"][0]
	originTitle := form["originTitle"][0]

	// log
	fmt.Println("username: ", username, ", title: ", title, ", origin title: ", originTitle)
	fmt.Println("description: ", description)
	fmt.Println("markdown: ", md)

	var response SaveArticleResponse

	// check password
	if !database.CheckPassword(username, password) {
		response.Result = "Fail"
		response.Str = "Log in information invalid"
	} else if title == "" {
		response.Result = "Fail"
		response.Str = "Title cannot be empty"
	} else {
		e := false // =True if error

		dir := d + title + "/"
		_, err := os.Stat(dir)

		// check path exist
		if title != originTitle && err == nil {
			response.Result = "Fail"
			response.Str = "File already exist"
			fmt.Println("File already exist")
		} else {
			if originTitle != "" {
				// remove original dir
				originDir := d + originTitle + "/"
				fmt.Println("remove dir: " + originDir)
				err = os.RemoveAll(originDir)
				if err != nil {
					fmt.Println(err)
					e = true
				}
			}

			// remove dir
			err = os.RemoveAll(dir)
			if err != nil {
				fmt.Println(err)
				e = true
			}

			// mkdir
			fmt.Println("create dir: " + dir)
			err := os.Mkdir(dir, 755)
			if err != nil {
				fmt.Println(err)
				e = true
			}

			// create md file
			mdFile, err := os.OpenFile(dir+title+".md", os.O_RDWR|os.O_CREATE, 0666)
			if err != nil {
				fmt.Println(err)
				e = true
			}

			// write markdown file
			_, err = mdFile.WriteString(md)
			if err != nil {
				fmt.Println(err)
				e = true
			}

			// create md file
			desFile, err := os.OpenFile(dir+"description.md", os.O_RDWR|os.O_CREATE, 0666)
			if err != nil {
				fmt.Println(err)
				e = true
			}

			// write markdown file
			_, err = desFile.WriteString(description)
			if err != nil {
				fmt.Println(err)
				e = true
			}

			if e {
				response.Result = "Fail"
				response.Str = "Server error"
			} else {
				response.Result = "Success"
				response.Str = "File has been saved"
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
