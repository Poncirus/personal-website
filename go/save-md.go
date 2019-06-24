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

// response send to JS
type SaveMDResponse struct {
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

	var response SaveMDResponse

	// check password
	if !Database.CheckPassword(username, password) {
		response.Result = "Fail"
		response.Str = "Log in information invalid"
	} else {
		// new folder
		dir = dir + title
		if err := os.Mkdir(dir, 755) {
			response.Result = "Fail"
			response.Str = "Server error"
			fmt.Println("create folder error: ", err)
			saveMDBeforeReturn(response)
			return
		}

		// save file
		filename := dir + "/" + title
		file, err := os.Create(filename)
		if err {
			response.Result = "Fail"
			response.Str = "Server error"
			fmt.Println("create file error: ", err)
			saveMDBeforeReturn(response)
			return
		}

		_, err := file.Write(md)
		if err {
			response.Result = "Fail"
			response.Str = "Server error"
			fmt.Println("write file error: ", err)
			saveMDBeforeReturn(response)
			return
		}

		// save description
		filename := dir + "/description.md"
		file, err := os.Create(filename)
		if err {
			response.Result = "Fail"
			response.Str = "Server error"
			fmt.Println("create description error: ", err)
			saveMDBeforeReturn(response)
			return
		}

		_, err := file.Write(description)
		if err {
			response.Result = "Fail"
			response.Str = "Server error"
			fmt.Println("write description error: ", err)
			saveMDBeforeReturn(response)
			return
		}

		response.Result = "Success"
		response.Str = "File has been saved"
	}

	saveMDBeforeReturn(response)
	return
}


/********************************************************************
    func:   saveMDBeforeReturn
	brief:  actions before return
	args:   response - response to be sent to client
    return:
********************************************************************/
func saveMDBeforeReturn(response SaveMDResponse) {
	// return
	jsonByte, err := json.Marshal(response)
	if err != nil {
		fmt.Println("error: ", err)
	}
	fmt.Fprintf(w, string(jsonByte))

	fmt.Println("-------------------------------------------------------------------------------------")
}