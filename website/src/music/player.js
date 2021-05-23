import React from 'react'

import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'
import './player.css'

import { getLanguageCookie } from '@/js/lang.js'

const labels = require('@/music/labels.json')
const lang = getLanguageCookie()

// music player
export default class Player extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <ReactJkMusicPlayer
            audioLists={this.props.list}
            mode="full"
            defaultVolume={1}
        />
    }
}