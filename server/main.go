package main

import (
	"log"
	"net/http"

	database "github.com/LiaoHanwen/personal-website/mongodb"

	"github.com/LiaoHanwen/personal-website/mylog"

	"github.com/tidwall/gjson"
)

// ConfigFile config file name
const ConfigFile string = "config.json"

// Config config json string
var Config string

// Log output log
var Log *mylog.MyLog

func defaultRoute(w http.ResponseWriter, r *http.Request) {
	Log.LogWarn("new request, command not found")
	http.Error(w, "command not found", 404)
}

func main() {
	// read config
	config := initConfig(ConfigFile)
	if config == nil {
		log.Fatal("Config file not found: ", ConfigFile)
	}
	Config = *config

	// init log
	Log = mylog.New(gjson.Get(Config, "log.class").String())

	// init database
	database.Init(gjson.Get(Config, "mongodb.server").String())

	// set route
	http.HandleFunc("/", defaultRoute)

	http.HandleFunc("/go/sign-in", signIn)

	http.HandleFunc("/go/save-article", saveArticle)
	http.HandleFunc("/go/delete-article", deleteArticle)
	http.HandleFunc("/go/get-article-list", getArticleList)
	http.HandleFunc("/go/get-article", getArticle)
	http.HandleFunc("/go/tag-search", tagSearch)
	http.HandleFunc("/go/title-search", titleSearch)
	http.HandleFunc("/go/get-tags", getTags)
	http.HandleFunc("/go/image-upload", imageUpload)

	// set listen port
	port := gjson.Get(Config, "web.port").String()
	Log.LogInfo("start server at port ", port)
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
