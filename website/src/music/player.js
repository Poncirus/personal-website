import React from 'react'

import CoolPlayer from 'react-cool-music-player'
import 'react-cool-music-player/dist/index.css'
import '@/music/player.css'

// music player
export default class Player extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className='wrapper fixed-bottom' id="player">
            <CoolPlayer
                data={this.props.list}
                showLyricNormal={true}
            />
        </div>
    }
}