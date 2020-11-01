package main

import (
	"fmt"
	"io/ioutil"
	"os"
)

// initConfig read config from config.json and store in CONFIG
func initConfig(configFile string) *string {
	// get dir
	dir, err := os.Getwd()
	if err != nil {
		fmt.Println(err)
	}
	dir = dir + "/" + configFile
	fmt.Println("Config file: ", dir)

	// read description
	file, err := ioutil.ReadFile(dir)
	if err != nil {
		fmt.Println(err)
		return nil
	}

	config := string(file)
	return &config
}
