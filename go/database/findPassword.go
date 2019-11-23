package database

// FindPassword get password for specified username from database
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
	}
	
	return nil
}
