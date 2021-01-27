package main

import (
	"bytes"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"path"
	"strings"

	id3 "github.com/mikkyang/id3-go"
	"github.com/tidwall/gjson"
)

func getMusicList(w http.ResponseWriter, r *http.Request) {
	Log.LogWarn("get-music-list, new request")

	type Music struct {
		Src    string `json:"src"`
		Artist string `json:"artist"`
		Name   string `json:"name"`
		Img    string `json:"img"`
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
			// read id3 info
			info, _ := id3.Open(gjson.Get(Config, "music.dir").String() + file)

			var music Music
			music.ID = info.Title()
			music.Name = info.Title()
			music.Artist = info.Artist()
			music.Img = gjson.Get(Config, "music.musicImgRoot").String() + file
			music.Src = gjson.Get(Config, "music.musicURLRoot").String() + file

			response.Music = append(response.Music, music)
		}
	}

	response.Result = "Success"
	reply(w, response)
	Log.LogInfo("get-music-list, finish")
}

func getMusicImg(w http.ResponseWriter, r *http.Request) {
	Log.LogWarn("get-music-img, new request")

	r.ParseForm()
	music := r.Form["music"][0]

	// add header
	w.Header().Add("Content-type", "application/octet-stream")
	w.Header().Add("content-disposition", "attachment; filename=\"cover.jpg\"")

	file := gjson.Get(Config, "music.dir").String() + music
	info, err := id3.Open(file)
	if err != nil {
		Log.LogWarn("read music error")

		// reply default img
		replyDefaultImg(w)
		return
	}
	defer info.Close()

	var frames []byte

	apicFrame := info.Frame("APIC")
	if apicFrame != nil {
		// APIC frame
		frames = apicFrame.Bytes()
	} else {
		// whole file
		frames, _ = ioutil.ReadFile(file)
	}

	start := bytes.Index(frames, []byte{0xFF, 0xD8})
	len := bytes.Index(frames[start+1:], []byte{0xFF, 0xD9})
	if start == -1 || len == -1 {
		replyDefaultImg(w)
		Log.LogInfo("get-music-img, finish")
		return
	}

	w.Write(frames[start : start+len+2])

	Log.LogInfo("get-music-img, finish")
}

func replyDefaultImg(w http.ResponseWriter) {
	img, _ := os.Open(gjson.Get(Config, "music.musicDefaultImg").String())
	defer img.Close()
	io.Copy(w, img)
}

func getMusicLyric(w http.ResponseWriter, r *http.Request) {
	Log.LogWarn("get-music-lyric, new request")

	type Response struct {
		Result string
		Lyric  string
	}

	var response Response

	r.ParseForm()
	music := r.Form["music"][0]

	file, err := os.Open(gjson.Get(Config, "music.dir").String() + music[:len(music)-len(path.Ext(music))] + ".lrc")

	if err != nil {
		response.Result = "Fail"
		response.Lyric = err.Error()
		reply(w, response)
		return
	}

	lyric, _ := ioutil.ReadAll(file)

	response.Result = "Success"
	response.Lyric = string(lyric)

	Log.LogInfo("get-music-lyric, finish")
}
