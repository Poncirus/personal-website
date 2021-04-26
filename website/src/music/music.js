import React from 'react'
import ReactDOM from 'react-dom'

import $ from 'jquery'

import { config } from '@/config/config.js'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'

import TopNavbar from '@/navbar/navbar.js'

import Player from '@/music/player.js'
import List from '@/music/list.js'

import { getLanguageCookie } from '@/js/lang.js'

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
            musicList: [],
            playerList: []
        }

        this.getMusicList = this.getMusicList.bind(this)
        this.playerDeleteMusic = this.playerDeleteMusic.bind(this)
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

                this.setState({ musicList: json.Music, playerList: json.Music })

            }.bind(this));
    }

    playerDeleteMusic(index, _id) {
        let list = [...this.state.playerList]
        list.splice(index, 1)
        this.setState({ playerList: list })
    }

    render() {
        return <div>
            <Container>
                <Row>
                    <Col xs={9}>
                        <List list={this.state.musicList}></List>
                    </Col>
                </Row>
            </Container>
            <Player list={this.state.playerList} delete={this.playerDeleteMusic}></Player>
        </div>
    }
}

// main
ReactDOM.render(<Music></Music>, document.getElementById('main'))