package main

import (
	"net/http"
	"strconv"
	"time"

	database "github.com/LiaoHanwen/personal-website/server/mongodb"
)

func getArticle(w http.ResponseWriter, r *http.Request) {
	Log.LogWarn("get-article, new request")

	type Response struct {
		Result  string
		Article database.Article
	}

	var response Response

	// get request
	r.ParseForm()
	form := r.Form

	id := form["id"][0]
	Log.LogInfo("ID: ", id)

	article, err := database.FindOneArticle(id)
	if err != nil {
		response.Result = err.Error()
		Log.LogWarn(err)
		reply(w, response)
		return
	}

	response.Result = "Success"
	response.Article = *article

	Log.LogInfo(article.CreateTime)

	reply(w, response)
	Log.LogInfo("get-article-list, finish")
}

func saveArticle(w http.ResponseWriter, r *http.Request) {
	Log.LogWarn("save-article, new request")

	type Response struct {
		Result string
		ID     string
		Str    string
	}

	var response Response

	// get request
	r.ParseForm()
	form := r.Form

	username := form["username"][0]
	password := form["password"][0]

	// check password
	if !database.CheckPassword(username, password) {
		Log.LogWarn("sign in fail")
		response.Result = "Fail"
		response.Str = "Incorrect username or password"
		reply(w, response)
		return
	}

	var article database.Article

	// id
	if val, ok := form["id"]; ok && val[0] != "" {
		id, err := database.NewArticleID(val[0])
		if err != nil {
			response.Result = "Fail"
			response.Str = err.Error()
			Log.LogWarn(err)
			reply(w, response)
			return
		}

		article.ID = id
	}

	// create time
	var create time.Time
	if val, ok := form["createTime"]; ok && val[0] != "" {
		var err error
		create, err = time.Parse(time.RFC3339, val[0])
		if err != nil {
			response.Result = "Fail"
			response.Str = err.Error()
			Log.LogWarn(err)
			reply(w, response)
			return
		}
	} else {
		create = time.Now()
	}
	article.CreateTime = &create

	// last modification time
	modification := time.Now()
	article.LastModification = &modification

	// tags
	article.Tags = append(article.Tags, form["tags[]"]...)

	// description
	article.Description = form["description"][0]

	// title
	article.Title = form["title"][0]

	// markdown
	article.Markdown = form["markdown"][0]

	id, err := database.SaveArticle(article)
	if err != nil {
		response.Result = "Fail"
		response.Str = err.Error()
		Log.LogWarn(err)
		reply(w, response)
		return
	}

	response.Result = "Success"
	response.Str = "File has been saved"
	response.ID = id

	reply(w, response)
	Log.LogInfo("save-article, finish")
}

func deleteArticle(w http.ResponseWriter, r *http.Request) {
	Log.LogWarn("delete-article, new request")

	type Response struct {
		Result string
		Str    string
	}

	var response Response

	// get request
	r.ParseForm()
	form := r.Form

	username := form["username"][0]
	password := form["password"][0]

	// check password
	if !database.CheckPassword(username, password) {
		Log.LogWarn("sign in fail")
		response.Result = "Fail"
		response.Str = "Incorrect username or password"
		reply(w, response)
		return
	}

	id := form["id"][0]
	err := database.DeleteArticle(id)
	if err != nil {
		response.Result = "Fail"
		response.Str = "Delete error"
		Log.LogWarn("delete error")
		reply(w, response)
		return
	}

	response.Result = "Success"
	response.Str = "Article has been deleted"
	reply(w, response)
	Log.LogInfo("delete-article, finish")
}

func getTags(w http.ResponseWriter, r *http.Request) {
	Log.LogWarn("get-tags, new request")

	type Response struct {
		Result string
		Tags   []string
	}

	var response Response

	tags, err := database.FindTags()
	if err != nil {
		response.Result = "Fail"
		Log.LogWarn("find tags error")
		reply(w, response)
		return
	}

	response.Result = "Success"
	response.Tags = tags
	reply(w, response)
	Log.LogInfo("get-tags, finish")
}

func searchArticle(w http.ResponseWriter, r *http.Request) {
	Log.LogWarn("search-article, new request")

	type Response struct {
		Result   string
		Articles []database.Article
	}

	var response Response

	// get request
	r.ParseForm()
	form := r.Form
	title := form["title"][0]
	tags := form["tags[]"]
	if tags == nil {
		tags = []string{}
	}
	count, err := strconv.Atoi(form["count"][0])
	if err != nil {
		response.Result = err.Error()
		Log.LogWarn(err)
		reply(w, response)
		return
	}
	offset, err := strconv.Atoi(form["offset"][0])
	if err != nil {
		response.Result = err.Error()
		Log.LogWarn(err)
		reply(w, response)
		return
	}
	sort := form["sort"][0]
	order, err := strconv.Atoi(form["order"][0])
	if err != nil {
		response.Result = err.Error()
		Log.LogWarn(err)
		reply(w, response)
		return
	}

	articles, err := database.FindAritcle(title, tags, count, offset, sort, order)
	if err != nil {
		response.Result = err.Error()
		Log.LogWarn(err)
		reply(w, response)
		return
	}

	response.Result = "Success"
	response.Articles = articles

	reply(w, response)
	Log.LogInfo("title-search, finish")
}
