import React from 'react'
import ReactDOM from 'react-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import TopNavbar from '@/navbar/navbar.js'

import { getLanguageCookie } from '@/js/lang.js'

const labels = require('@/home/labels.json')
const lang = getLanguageCookie()

// set title
document.title = '橘生淮北 - ' + labels["Home"][lang]

const navbar = <TopNavbar currentPage="Home"></TopNavbar>
ReactDOM.render(navbar, document.getElementById('navbar'))

import Panel from '@/home/panel.js'

const panels = [{
    header: labels["Tools"][lang],
    intro: labels["Useful tools"][lang],
    items: [{ item: labels["Tool List"][lang], href: "/tools" }]
}, {
    header: labels["Articles"][lang],
    intro: labels["My Notes and thoughts"][lang],
    items: [{ item: labels["Article List"][lang], href: "/articles/article-list" }]
}, {
    header: labels["Music"][lang],
    intro: labels["My favorate songs"][lang],
    items: [{ item: labels["Player"][lang], href: "/Music" }]
}, {
    header: labels["About me"][lang],
    intro: labels["My resume & personal information"][lang],
    items: [{ item: labels["My informations"][lang], href: "/about-me" }]
}, {
    header: labels["VSCode"][lang],
    intro: labels["Online Vitual Studio Code editor, powered by code-server"][lang],
    items: [{ item: labels["Launch VSCode Online"][lang], href: "https://code.liaohanwen.com" }, { item: labels["code-server on Github"][lang], href: "https://github.com/cdr/code-server" }]
}, {
    header: labels["Cloud"][lang],
    intro: labels["My online storage, powered by Nextcloud"][lang],
    items: [{ item: labels["Cloud Disk"][lang], href: "https://cloud.liaohanwen.com" }, { item: labels["Nextcloud Website"][lang], href: "https://nextcloud.com/" }]
}]

ReactDOM.render(panels.map(v => <Panel key={v.header} {...v}></Panel>), document.getElementById('panels'))