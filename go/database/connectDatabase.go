/********************************************************************
    file:   connectDatabase.go
    brief:  connect database
********************************************************************/
package database

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

/********************************************************************
    func:   ConnectDatabase
    brief:  connect database
	args:
    return: *DB
********************************************************************/
func ConnectDatabase() *sql.DB {
	// init database
	db, err := sql.Open("mysql", "remote-web:Lhw1997424220!@tcp(liaohanwen.com)/web")
	if err != nil {
		panic(err.Error())
	}

	return db
}
