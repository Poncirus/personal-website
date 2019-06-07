/********************************************************************
    file:   sign-in.go
    brief:  sign in action
********************************************************************/
package main

import "fmt"
import "net/http"
import "encoding/json"
import "crypto/sha256"
import "encoding/hex"
import "./Database"

// responce send to JS
type SignInResponce struct {
	Result string
	Str    string
}

/********************************************************************
    func:   signIn
	brief:  match password
			the password is encrypted twice with sha256,
			then compared with the password in the database
	args:   w - responseWriter
			r - request
    return:
********************************************************************/
func signIn(w http.ResponseWriter, r *http.Request) {
	fmt.Println("---------------------------------------Sign In---------------------------------------")

	// get request
	r.ParseForm()
	form := r.Form
	username := form["username"][0]
	password := form["password"][0]

	// log
	fmt.Println("username: ", username, ", password: ", password)

	var responce SignInResponce

	// match password
	dbPassword := Database.FindPassword(username)
	if dbPassword == nil {
		responce.Result = "Fail"
		responce.Str = "Incorrect username or password"
		fmt.Println("Login fail, cannot find username")
	} else {
		crypto := sha256.New()
		crypto.Write([]byte(password))
		cryptoPassword := hex.EncodeToString(crypto.Sum(nil))
		fmt.Println(cryptoPassword)
		if *dbPassword == cryptoPassword {
			responce.Result = "Success"
			fmt.Println("Login success")
		} else {
			responce.Result = "Fail"
			responce.Str = "Incorrect username or password"
			fmt.Println("Login fail, password incorrect")
		}
	}

	// output
	jsonByte, err := json.Marshal(responce)
	if err != nil {
		fmt.Println("error: ", err)
	}
	fmt.Fprintf(w, string(jsonByte))

	fmt.Println("Return:", string(jsonByte))
	fmt.Println("-------------------------------------------------------------------------------------")
}
