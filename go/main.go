/********************************************************************
    file:   main.go
    brief:  go web server
********************************************************************/

package main

import "net/http"
import "log"

/********************************************************************
    func:   defaultRoute
    brief:  return 404 and message
    args:   w - request ResponseWriter
            r - request
    return:
********************************************************************/
func defaultRoute(w http.ResponseWriter, r *http.Request) {
	http.Error(w, "go server command not found", 404)
}

func main() {
	// set route
	http.HandleFunc("/", defaultRoute)
	http.HandleFunc("/go/notice-search", noticeSearch)
	http.HandleFunc("/go/sign-in", signIn)

	// set listen port
	err := http.ListenAndServe(":8081", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
