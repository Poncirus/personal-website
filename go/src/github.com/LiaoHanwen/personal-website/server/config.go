package main

import (
	"fmt"
	"path/filepath"
	"io/ioutil"
	"os"
)

// initConfig read config from config.json and store in CONFIG
func initConfig(configFile string) *string {
	// get dir
	dir, err := filepath.Abs(filepath.Dir(os.Args[0]))
	if err != nil {
		fmt.Println(err)
	}
	dir = dir + "/" + configFile

	// read description
	file, err := ioutil.ReadFile(dir)
	if err != nil {
		fmt.Println(err)
		return nil
	}

	config := string(file)
	return &config
}