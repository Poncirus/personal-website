package database

import "database/sql"

// ConnectDatabase connect to database 
func ConnectDatabase() *sql.DB {
	// init database
	db, err := sql.Open("mysql", "remote-web:Lhw1997424220!@tcp(liaohanwen.com)/web")
	if err != nil {
		panic(err.Error())
	}

	return db
}
