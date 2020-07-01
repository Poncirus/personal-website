import React from 'react'
import ReactDOM from 'react-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import "@/main/cover.css";

import heartImg from "@/main/heart.png"

// set title
document.title = '橘生淮北'

// heart img
const heart = <img className="my-4" src={heartImg} alt="heart png" height="200" />
ReactDOM.render(heart, document.getElementById('heart'))

// navbar
function Navbar() {
    const items = [{
        str: "Home",
        src: "/home"
    },
    {
        str: "Tools",
        src: "/tools"
    },
    {
        str: "Articles",
        src: "/articles/article-list"
    },
    {
        str: "About me",
        src: "/about-me"
    }]

    return items.map(v => <a className="nav-link" href={v.src} key={v.str} > {v.str} </a>)
}

ReactDOM.render(<Navbar></Navbar>, document.getElementById('navbar'))