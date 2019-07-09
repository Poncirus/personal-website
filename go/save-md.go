/********************************************************************
    file:   save-md.go
    brief:  save markdown file
********************************************************************/
package main

import "encoding/json"
import "fmt"
import "net/http"
import "os"
import "path/filepath"
import "./Database"

// responce send to JS
type SaveMDResponce struct {
	Result string
	Str    string
}

/********************************************************************
	func:   saveMD
	brief:  save markdown file
	args:   w - responseWriter
			r - request
	return:
********************************************************************/
func saveMD(w http.ResponseWriter, r *http.Request) {
	fmt.Println("---------------------------------------Save MD---------------------------------------")

	// get dir
	dir, err := filepath.Abs(filepath.Dir(os.Args[0]))
	if err != nil {
		fmt.Println(err)
	}
	dir = dir + "/../static/markdown/"

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

	var response SaveMDResponce

	// check password
	if !Database.CheckPassword(username, password) {
		response.Result = "Fail"
		response.Str = "Log in information invalid"
	} else {
		dir = dir + title + "/"
		_, err := os.Stat(dir)

		// check path exist
		if title != originTitle && err == nil {
			response.Result = "Fail"
			response.Str = "File already exist"
			fmt.Println("File already exist")
		} else {
			// remove dir
			err = os.RemoveAll(dir)
			if err != nil {
				fmt.Println(err)
			}

			// mkdir
			fmt.Println("create dir: " + dir)
			err := os.Mkdir(dir, 755)
			if err != nil {
				fmt.Println(err)
			}

			// create md file
			mdFile, err := os.OpenFile(dir+title+".md", os.O_RDWR|os.O_CREATE, 0666)
			if err != nil {
				fmt.Println(err)
			}

			// write markdown file
			_, err = mdFile.WriteString(md)
			if err != nil {
				fmt.Println(err)
			}

			// create md file
			desFile, err := os.OpenFile(dir+"description.md", os.O_RDWR|os.O_CREATE, 0666)
			if err != nil {
				fmt.Println(err)
			}

			// write markdown file
			_, err = desFile.WriteString(description)
			if err != nil {
				fmt.Println(err)
			}

			response.Result = "Success"
			response.Str = "File has been saved"
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
