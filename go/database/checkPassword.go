/********************************************************************
    file:   checkPassword.go
    brief:  check password for specified username from database
********************************************************************/
package database

import (
	"crypto/sha256"
	"encoding/hex"

	_ "github.com/go-sql-driver/mysql"
)

/********************************************************************
	func:   CheckPassword
    brief:  check password for specified username from database
	args:   username - specified username
			password - password to be checked
	return: true - match
			false - wrong
********************************************************************/
func CheckPassword(username string, password string) bool {
	// get password
	dbPassword := FindPassword(username)

	// match
	if dbPassword == nil {
		return false
	} else {
		crypto := sha256.New()
		crypto.Write([]byte(password))
		cryptoPassword := hex.EncodeToString(crypto.Sum(nil))
		if *dbPassword == cryptoPassword {
			return true
		} else {
			return false
		}
	}
}
