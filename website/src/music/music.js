import React from 'react'
import ReactDOM from 'react-dom'

import $ from 'jquery'

import 'bootstrap/dist/css/bootstrap.min.css'

import TopNavbar from '@/navbar/navbar.js'

import { getLanguageCookie } from '@/js/lang.js'

const labels = require('@/music/labels.json')
const lang = getLanguageCookie()

import CoolPlayer from 'react-cool-music-player'
import 'react-cool-music-player/dist/index.css'
import '@/music/player.css'

// set title
document.title = '橘生淮北 - ' + labels['Music'][lang]

// navbar
const navbar = <TopNavbar currentPage="Music"></TopNavbar>
ReactDOM.render(navbar, document.getElementById('navbar'))

// webpage
class Music extends React.Component {
    constructor(props) {
        super(props)
        this.data = [
            {
                src: 'https://liaohanwen.com/music-resources/Beginner - AKB48.flac',
                artist: 'AKB48',
                name: 'Beginner',
                id: 'Beginner - AKB48.flac',
                lyric: '[ti:Beginner (《AKB0048 Next Stage》TV动画插曲)]\n[ar:AKB48 (エーケービー フォーティエイト)]\n[al:0と1の間 Theater Edition (0和1之间)]\n[by:]\n[offset:0]\n[kana:1よんじゅうはち1し1あき1もと1やすし1きょく1い1うえ2きのう1けい1けん1ち1しき1に1もつ1かぜ1とお1す1あと1なに1のこ1あたら1みち1さが2ひと1ち1ず1ひろ1ふ1め1あ1とき1ゼロ1ぼく1ゆめ1み1み1らい1しん1こわ1し1み1ほど1し1む1てっ1ぽう1いま1ぼく1ゆめ1み1こ1し1はい1くさり1ひ1なに1し1しっ1ぱい1はじ1きず1おも1に1ど1いや1かしこ2おとな1ば1か1かい1ひ1おろ1けい1さん1なに1まも1ぼく1い1あ1した1い1し1ゆめ1ひさ1ぼく1い1いのち1む1だ1みゃく1う1こ1どう1いま1かん1う1ひ1おも1だ1だれ1はじ1かん1たん1う1ま1い1さい1しょ1もど1ひら1なお1ひら1なお1ふる1やぶ1す1はじ1ぼく1ゆめ1み1み1らい1しん1こわ1し1み1ほど1し1む1てっ1ぽう1いま1ぼく1ゆめ1み1こ1し1はい1くさり1ひ1なに1ぼく1わか1なに1ぼく1か1のう1せい1あめ1や1かぜ1や1み1ひかり1さ1いま1とき1きみ1う1か]\n[00:00.00]Beginner - AKB４８ (エーケービー フォーティエイト)\n[00:00.42]词：秋元康\n[00:00.85]曲：井上ヨシマサ\n[00:01.28]In your position set\n[00:03.88]\n[00:16.56]昨日までの経験とか\n[00:19.42]知識なんか荷物なだけ\n[00:22.11]風はいつも通り過ぎて\n[00:25.14]後に何も残さないよ\n[00:28.34]新しい道を探せ\n[00:31.06]他人の地図を広げるな\n[00:33.85]\n[00:34.37]伏せた目を上げた時に\n[00:37.29]０になるんだ\n[00:39.84]\n[00:40.58]僕らは夢見てるか?\n[00:42.89]未来を信じているか?\n[00:46.22]怖いもの知らず\n[00:47.84]身の程知らず\n[00:49.38]無鉄砲なまま\n[00:51.62]今 僕らは夢見てるか?\n[00:54.91]子どものようにまっさらに\n[00:58.03]支配された鎖は引きちぎろう\n[01:04.44]\n[01:06.41]Change your mind\n[01:07.54]\n[01:08.15]Change your mind\n[01:10.50]\n[01:11.01]何も知らなくていい beginner\n[01:16.43]\n[01:34.55]失敗して 恥をかいて\n[01:37.17]傷ついたことトラウマになって\n[01:40.19]あんな思い ２度と嫌だと\n[01:43.40]賢くなった大人たちよ\n[01:46.53]チャレンジは馬鹿げたこと\n[01:49.36]リスク 回避するように\n[01:52.35]愚かな計算して何を守るの?\n[01:58.18]僕らは生きているか?\n[02:00.67]明日も生きていたいか?\n[02:03.91]わかったふりして\n[02:05.42]知ったかぶりで\n[02:07.06]夢も久しぶり\n[02:09.67]そう 僕らは生きているか?\n[02:12.93]命無駄にしてないか?\n[02:16.19]脈を打つ鼓動を今 感じろ\n[02:22.50]\n[02:25.75]Stand up together\n[02:28.40]生まれた日 思い出せ\n[02:30.21]誰もが beginner\n[02:31.43]Stand up right away\n[02:34.64]初めから簡単に\n[02:36.22]上手くは行かねえ\n[02:37.93]Stand up together\n[02:40.47]最初に戻ればいい\n[02:42.02]もいちど beginner\n[02:43.52]Stand up right away\n[02:46.47]開き直って開き直って\n[02:48.35]どうにかなるさ\n[02:49.98]古いページは破り捨てろ\n[02:55.43]さあ 始めようぜ\n[02:57.94]\n[02:58.46]We can be reborn all the time\n[03:01.41]僕らは夢見てるか?\n[03:03.97]未来を信じているか?\n[03:07.20]怖いもの知らず\n[03:08.72]身の程知らず\n[03:10.33]無鉄砲なまま\n[03:12.57]今僕らは夢見てるか?\n[03:15.95]子どものようにまっさらに\n[03:19.20]支配された鎖は引きちぎろう\n[03:25.19]何もできない\n[03:26.54]ちゃんとできない\n[03:28.07]それがどうした?\n[03:29.51]僕らは若いんだ\n[03:31.10]何もできない\n[03:32.44]すぐにできない\n[03:34.01]だから僕らに\n[03:35.23]可能性があるんだ\n[03:37.17]雨は止んだ\n[03:38.39]風は止んだ\n[03:39.87]見たことのない\n[03:41.29]光が差すよ\n[03:43.02]今が時だ\n[03:44.01]君は生まれ変わった beginner'
            }
        ]
    }
    
    render() {
        return <div className={'wrapper'}  id="player">
            <CoolPlayer 
                data={this.data}
                showLyricNormal={true}
                icons={{
                    deleteIcon: null
                }}
            />
        </div>
    }
}

// main
ReactDOM.render(<Music></Music>, document.getElementById('footer'))