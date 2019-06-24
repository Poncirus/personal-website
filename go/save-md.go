/********************************************************************
    file:   save-md.go
    brief:  save markdown file
********************************************************************/
package main

import "encoding/json"
import "fmt"
import "net/http"
import "os"
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

	// save dir
	dir := "../static/markdown/"

	// get request
	r.ParseForm()
	form := r.Form
	username := form["username"][0]
	password := form["password"][0]
	title := form["title"][0]
	description := form["description"][0]
	md := form["markdown"][0]
	firstFlag := form["first"][0]

	// log
	fmt.Println("username: ", username, ", title: ", title, ", first: ", firstFlag)
	fmt.Println("description: ", description)
	fmt.Println("markdown: ", md)

	var response SaveMDResponce

	// check password
	if !Database.CheckPassword(username, password) {
		response.Result = "Fail"
		response.Str = "Log in information invalid"
	} else {
		dir = dir + title
		os.Mkdir(dir, 755)
		response.Result = "Success"
		response.Str = "File has been saved"
	}

	// return
	jsonByte, err := json.Marshal(response)
	if err != nil {
		fmt.Println("error: ", err)
	}
	fmt.Fprintf(w, string(jsonByte))

	fmt.Println("-------------------------------------------------------------------------------------")
}
