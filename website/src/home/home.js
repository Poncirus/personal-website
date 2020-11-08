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
}, {
    header: "About me",
    intro: "My informations",
    items: [{ item: "Informations", href: "/about-me" }]
}, {
    header: "VSCode",
    intro: "Visual Studio Code online editor, powered by code-server",
    items: [{ item: "Launch VSCode Online", href: "https://code.liaohanwen.com" }, { item: "code-server on Github", href: "https://github.com/cdr/code-server" }]
}, {
    header: "Cloud",
    intro: "My cloud disk, powered by Nextcloud",
    items: [{ item: "Cloud Disk", href: "https://cloud.liaohanwen.com" }, { item: "Nextcloud Website", href: "https://nextcloud.com/" }]
}]

ReactDOM.render(panels.map(v => <Panel key={v.header} {...v}></Panel>), document.getElementById('panels'))