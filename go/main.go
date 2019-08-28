/********************************************************************
    file:   main.go
    brief:  go web server
********************************************************************/

package main

import (
	"fmt"
	"log"
	"net/http"
)

/********************************************************************
    func:   defaultRoute
    brief:  return 404 and message
    args:   w - request ResponseWriter
            r - request
    return:
********************************************************************/
func defaultRoute(w http.ResponseWriter, r *http.Request) {
	fmt.Println("---------------------------------Command Not Found-----------------------------------")
	http.Error(w, "go server command not found", 404)
	fmt.Println("-------------------------------------------------------------------------------------")

}

func main() {
	// set route
	http.HandleFunc("/", defaultRoute)
	http.HandleFunc("/go/notice-search", noticeSearch)
	http.HandleFunc("/go/sign-in", signIn)
	http.HandleFunc("/go/save-article", saveArticle)
	http.HandleFunc("/go/get-article-list", getArticleList)

	// set listen port
	err := http.ListenAndServe(":8082", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
