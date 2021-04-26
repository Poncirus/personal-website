import React from 'react'

import CoolPlayer from 'react-cool-music-player'
import 'react-cool-music-player/dist/index.css'
import '@/music/player.css'

import { getLanguageCookie } from '@/js/lang.js'

const labels = require('@/music/labels.json')
const lang = getLanguageCookie()

// music player
export default class Player extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playListShow: false
        }
    }

    render() {
        return <div className='wrapper fixed-bottom' id="player">
            <CoolPlayer
                data={this.props.list}
                showLyricNormal={true}
                currentAudio={this.props.list.length == 0 ? null : this.props.list[0]}
                playListHeader={{
                    headerLeft: labels['Play List'][lang],
                    headerRight: <span onClick={() => {this.setState({playListShow: false})}} className={'close-play-list'}>{labels['Close'][lang]}</span>
                }}
                playListShow={this.state.playListShow}
                onPlayListStatusChange={(status) => {
                    this.setState({playListShow: status})
                }}
                onDelete={this.props.delete}
            />
        </div>
    }
}