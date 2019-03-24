/********************************************************************
    file:   main.go
    brief:  go web server
********************************************************************/

package main

import (
    "net/http"
    "log"
)

// listen port
const PORT string = "8081"

/********************************************************************
    func:   defaultRoute
    brief:  return 404 and message
    args:   w - request ResponseWriter
            r - request
********************************************************************/
func defaultRoute(w http.ResponseWriter, r *http.Request) {
    http.Error(w, "go server command not found", 404)
}

/********************************************************************
    func:   main
    brief:  redirect request
********************************************************************/
func main() {
    // set default route (return 404)
    http.HandleFunc("/", defaultRoute)

    // set route for notice-search
    http.HandleFunc("/notice-search/", noticeSearch)

    // listen port 8081
    err := http.ListenAndServe(":" + PORT, nil)
    if err != nil {
        log.Fatal("ListenAndServe: ", err)
    }
}
