/********************************************************************
    file:   findPassword.go
    brief:  get password for specified username from database
********************************************************************/
package Database

import _ "github.com/go-sql-driver/mysql"

/********************************************************************
    func:   FindPassword
    brief:  get password for specified username from database
	args:   username - specified username
    return: password (nil if cannot find username)
********************************************************************/
func FindPassword(username string) *string {
	db := ConnectDatabase()
	defer db.Close()

	// search
	rows, err := db.Query("SELECT password FROM user WHERE username='" + username + "'")
	if err != nil {
		panic(err.Error())
	}

	// get result
	if rows.Next() {
		var password string
		rows.Scan(&password)
		return &password
	} else {
		return nil
	}
}
