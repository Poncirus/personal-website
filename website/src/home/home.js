import React from 'react'
import ReactDOM from 'react-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import TopNavbar from '@/navbar/navbar.js'

// set title
document.title = '橘生淮北 - Home'

const navbar = <TopNavbar currentPage="Home"></TopNavbar>
ReactDOM.render(navbar, document.getElementById('navbar'))

import Panel from '@/home/panel.js'

const panels = [{
    header: "Tools",
    intro: "Some useful tools",
    items: [{ item: "Tool List", href: "/tools" }]
}, {
    header: "Articles",
    intro: "My notes",
    items: [{ item: "Article List", href: "/articles/article-list" }]
}]

ReactDOM.render(panels.map(v => <Panel key={v.header} {...v}></Panel>), document.getElementById('panels'))