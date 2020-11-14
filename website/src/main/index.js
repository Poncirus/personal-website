import React from 'react'
import ReactDOM from 'react-dom'

import TopNavbar from '@/navbar/navbar.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import "@/main/cover.css";

import heartImg from "@/main/heart.png"

// set title
document.title = '橘生淮北'

ReactDOM.render(<TopNavbar></TopNavbar>, document.getElementById('header'))

class Main extends React.Component {
    render() {
        return <div>
            <h1 className="cover-heading">To Ling</h1>
            <p className="lead">I will Love You and Respect You Till the End of My Life.</p>
            <img className="my-4" src={heartImg} alt="heart png" height="200" />
            <p className="lead">2019/3/26</p>
        </div>
    }
}

ReactDOM.render(<Main></Main>, document.getElementById('main'))

class Footer extends React.Component {
    render() {
        return <div>
            <p>Website for My Love</p>
            <a href="http://www.beian.miit.gov.cn" className="text-dark">京ICP备17044828号-1</a>
        </div>
    }
}

ReactDOM.render(<Footer></Footer>, document.getElementById('footer'))