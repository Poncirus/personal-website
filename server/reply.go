package main

import (
	"fmt"
	"encoding/json"
	"net/http"
)

func reply(w http.ResponseWriter, v interface{}) {
	jsonByte, err := json.Marshal(v)
	if err != nil {
		fmt.Println("error: ", err)
	}
	fmt.Fprintf(w, string(jsonByte))
}