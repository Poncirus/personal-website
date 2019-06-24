/********************************************************************
    file:   FindPassword.go
    brief:  get password for specified username from database
********************************************************************/
package Database

import "database/sql"
import _ "github.com/go-sql-driver/mysql"

/********************************************************************
    func:   FindPassword
    brief:  get password for specified username from database
	args:   username - specified username
    return: password (nil if cannot find username)
********************************************************************/
func FindPassword(username string) *string {
	// init database
	db, err := sql.Open("mysql", "web:Lhw1997424220!@/web")
	if err != nil {
		panic(err.Error())
	}
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
