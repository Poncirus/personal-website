package main

import (
	"net/http"

	database "github.com/LiaoHanwen/personal-website/mongodb"
)

func signIn(w http.ResponseWriter, r *http.Request) {
	Log.LogWarn("sign-in, new request")

	// response send to JS
	type Response struct {
		Result string
		Str    string
	}

	// get request
	r.ParseForm()
	form := r.Form
	username := form["username"][0]
	password := form["password"][0]

	var response Response

	// check password
	if !database.CheckPassword(username, password) {
		Log.LogWarn("sign in fail")
		response.Result = "Fail"
		response.Str = "Incorrect username or password"
		reply(w, response)
		return
	}

	Log.LogInfo("sign in success")
	response.Result = "Success"
	reply(w, response)
}
