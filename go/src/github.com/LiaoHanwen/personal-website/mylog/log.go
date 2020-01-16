package mylog

import (
	"log"
	"bytes"
	"fmt"
)

// MyLog records settings of logs
type MyLog struct {
	logClass int
}

// New create a new log handler. class should be "warn" or "info". "info" will be set by default
func New(logClass string) *MyLog {
	// warn: 3
	// info: 2
	if (logClass == "warn") {
		return &MyLog{logClass: 3}
	}

	return &MyLog{logClass: 2}
}

// LogInfo print a log with info class
func (l *MyLog) LogInfo(v ...interface{}) {
	if l.logClass > 2 {
		return
	}

	var buf bytes.Buffer
	var logger = log.New(&buf, "INFO: ", log.LstdFlags)

	logger.Print(v...)
	fmt.Print(&buf)
}

// LogWarn print a log with warn class
func (l *MyLog) LogWarn(v ...interface{}) {
	if l.logClass > 3 {
		return
	}

	var buf bytes.Buffer
	var logger = log.New(&buf, "WARN: ", log.LstdFlags)

	logger.Print(v...)
	fmt.Print(&buf)
}