package main

import (
	"io/ioutil"
	"net/http"
	"path"
	"strings"

	"github.com/tidwall/gjson"
)

func getMusicList(w http.ResponseWriter, r *http.Request) {
	Log.LogWarn("get-music-list, new request")

	type Music struct {
		Src    string `json:"src"`
		Artist string `json:"artist"`
		Name   string `json:"name"`
		ID     string `json:"id"`
	}

	type Response struct {
		Result string
		Music  []Music
	}

	var response Response

	dir := gjson.Get(Config, "music.dir").String()
	files, err := ioutil.ReadDir(dir)

	if err != nil {
		response.Result = "Fail"
		Log.LogWarn("read music dir error")
		reply(w, response)
		return
	}

	for _, f := range files {
		file := f.Name()
		ext := strings.ToLower(path.Ext(file))
		if ext == ".mp3" || ext == ".wav" || ext == ".flac" || ext == ".ape" {
			name := file[0 : len(file)-len(ext)]
			info := strings.Split(name, " - ")
			if len(info) != 2 {
				Log.LogWarn("music name does not match pattern, ", name)
				continue
			}

			var music Music
			music.ID = info[0]
			music.Name = info[0]
			music.Artist = info[1]
			music.Src = gjson.Get(Config, "music.musicURLRoot").String() + file

			response.Music = append(response.Music, music)
		}
	}

	response.Result = "Success"
	reply(w, response)
	Log.LogInfo("get-music-list, finish")
}
