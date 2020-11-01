package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"time"

	"github.com/tidwall/gjson"
)

// imageUpload handle image upload request
func imageUpload(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodOptions {
		return
	}

	Log.LogWarn("image-upload, new request")

	// successful response
	type Data struct {
		FilePath string `json:"filePath"`
	}

	type Response struct {
		Data Data `json:"data"`
	}

	// error response
	type ErrorResponse struct {
		Error int `json:"error"`
	}

	// get dir
	dir, err := filepath.Abs(filepath.Dir(os.Args[0]))
	if err != nil {
		fmt.Println(err)
	}
	dir = dir + gjson.Get(Config, "markdown.imageRoot").String()

	var response Response
	var errorResponse ErrorResponse

	// get request
	file, header, err := r.FormFile("image")

	if err != nil {
		Log.LogWarn(err)
		errorResponse.Error = 413
		reply(w, errorResponse)
		Log.LogWarn("image-upload, fail excution")
		return
	}

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

	response.Data.FilePath = gjson.Get(Config, "markdown.imageURLRoot").String() + name

	reply(w, response)
	Log.LogInfo("image-upload, finish")
}
