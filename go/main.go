/********************************************************************
    file:   main.go
    brief:  go web server
********************************************************************/

package main

import (
    "net/http"
    "log"
)

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
    http.HandleFunc("/", defaultRoute) //设置访问的路由
    http.HandleFunc("/notice-search/", noticeSearch)
    err := http.ListenAndServe(":8081", nil) //设置监听的端口
    if err != nil {
        log.Fatal("ListenAndServe: ", err)
    }
}
