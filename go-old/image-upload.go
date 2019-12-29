/********************************************************************
    file:   image-upload.go
    brief:  handle image upload request
********************************************************************/
package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"time"

	"github.com/tidwall/gjson"
)

// ImageUploadResponse response send to editor.md
type ImageUploadResponse struct {
	Success int		`json:"success"`
	Message string	`json:"message"`
	URL     string	`json:"url"`
}

/********************************************************************
	func:   imageUpload
	brief:  handle image upload request
	args:   w - responseWriter
			r - request
	return:
********************************************************************/
func imageUpload(w http.ResponseWriter, r *http.Request) {
	fmt.Println("------------------------------------Image Upload-------------------------------------")

	// get dir
	dir, err := filepath.Abs(filepath.Dir(os.Args[0]))
	if err != nil {
		fmt.Println(err)
	}
	dir = dir + gjson.Get(Config, "markdown.imageRoot").String()

	var response ImageUploadResponse

	// get request
	file, header, err := r.FormFile("editormd-image-file")
	if err != nil {
		fmt.Println(err)
		response.Success = 0
		response.Message = err.Error()
	} else {
		defer file.Close()

		// file name += timestamp
		name := header.Filename + "-" + strconv.FormatInt(time.Now().Unix(), 10)
		filePath := dir + name
		out, err := os.Create(filePath)
		defer out.Close()

		// write the content from POST to the file
		_, err = io.Copy(out, file)
		if err != nil {
			fmt.Println(err)
		}

		response.Success = 1
		response.URL = gjson.Get(Config, "markdown.imageURLRoot").String() + name
	}

	// return
	jsonByte, err := json.Marshal(response)
	if err != nil {
		fmt.Println("error: ", err)
	}
	fmt.Fprintf(w, string(jsonByte))

	fmt.Println("-------------------------------------------------------------------------------------")
}
