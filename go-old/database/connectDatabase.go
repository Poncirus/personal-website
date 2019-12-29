package database

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)

// ConnectDatabase connect to database
func ConnectDatabase() *sql.DB {
	// init database
	db, err := sql.Open("mysql", "remote-web:<password>!@tcp(liaohanwen.com)/web")
	if err != nil {
		panic(err.Error())
	}

	return db
}
