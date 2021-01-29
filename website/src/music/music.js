import React from 'react'
import ReactDOM from 'react-dom'

import $ from 'jquery'

import { config } from '@/config/config.js'

import 'bootstrap/dist/css/bootstrap.min.css'

import TopNavbar from '@/navbar/navbar.js'

import { getLanguageCookie } from '@/js/lang.js'

import Player from '@/music/player.js'

const labels = require('@/music/labels.json')
const lang = getLanguageCookie()

// set title
document.title = '橘生淮北 - ' + labels['Music'][lang]

// navbar
const navbar = <TopNavbar currentPage="Music"></TopNavbar>
ReactDOM.render(navbar, document.getElementById('navbar'))

// webpage
class Music extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            musicList: []
        }

        this.getMusicList = this.getMusicList.bind(this)
    }

    componentDidMount() {
        this.getMusicList()
    }

    getMusicList() {
        $.get(config.server + "/go/get-music-list",
            function (data, status) {
                // request not success
                if (status != "success") {
                    console.log("request not success")
                    return
                }
                // parse data to json object
                var json = JSON.parse(data)

                if (json.Result != "Success") {
                    console.log("get music list request not success")
                    return
                }

                this.setState({ musicList: json.Music })

            }.bind(this));
    }

    render() {
        return <div>
            <Player list={this.state.musicList}></Player>
        </div>
    }
}

// main
ReactDOM.render(<Music></Music>, document.getElementById('main'))