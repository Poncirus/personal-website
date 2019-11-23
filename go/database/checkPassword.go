package database

import (
	"crypto/sha256"
	"encoding/hex"
)

// CheckPassword check password for specified username from database
func CheckPassword(username string, password string) bool {
	// get password
	dbPassword := FindPassword(username)

	// match
	if dbPassword == nil {
		return false
	} 
	
	crypto := sha256.New()
	crypto.Write([]byte(password))
	cryptoPassword := hex.EncodeToString(crypto.Sum(nil))
	if *dbPassword == cryptoPassword {
		return true
	} 

	return false
}
