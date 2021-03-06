import React from 'react'
import ReactDOM from 'react-dom'

import '@/navbar/navbar.css'

import NavbarItem from '@/navbar/navbar_item.js'

import { getUsernameCookie } from '@/js/user.js'
import { getLanguageCookie, setLanguageCookie } from '@/js/lang.js'

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

const labels = require('@/navbar/labels.json')
const lang = getLanguageCookie()

export default class TopNavbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [{
                item: "Home",
                label: labels["Home"][lang],
                href: "/home"
            },
            {
                item: "Tools",
                label: labels["Tools"][lang],
                href: "/tools"
            },
            {
                item: "Articles",
                label: labels["Articles"][lang],
                href: "/articles/article-list"
            },
            {
                item: "Music",
                label: labels["Music"][lang],
                href: "/music"
            },
            {
                item: "About me",
                label: labels["About me"][lang],
                href: "/about-me"
            },
            {
                item: "Neighbor",
                label: labels["Neighbors"][lang],
                href: "/neighbor"
            },
            {
                item: "divider"
            },
            {
                item: "VSCode",
                label: labels["VSCode"][lang],
                href: "https://code.liaohanwen.com"
            },
            {
                item: "Cloud",
                label: labels["Cloud"][lang],
                href: "https://cloud.liaohanwen.com"
            },
            {
                item: "divider-horizontal"
            }]
        }

        this.changeLanguage = this.changeLanguage.bind(this)
    }

    changeLanguage(lang) {
        setLanguageCookie(lang)
        location.reload()   // refresh website
    }


    render() {
        let style = this.props.zIndex == null ? { zIndex: 1030 } : { zIndex: this.props.zIndex }
        return <Navbar className="text-left" expand="md" fixed="top" bg="dark" variant="dark" style={style}>
            <Navbar.Brand href="/">Liao Hanwen</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {this.state.items.map(v => <NavbarItem key={v.item} bold={this.props.currentPage == v.item} {...v}></NavbarItem>)}
                </Nav>
                <Nav>
                    <NavDropdown title={labels["Language"][lang]} className="mx-2">
                        <NavDropdown.Item onSelect={(e) => { this.changeLanguage("zh") }}>中文</NavDropdown.Item>
                        <NavDropdown.Item onSelect={(e) => { this.changeLanguage("en") }}>English</NavDropdown.Item>
                    </NavDropdown>
                    {getUsernameCookie() == null ?
                        <NavbarItem item="Sign in" label={labels["Sign in"][lang]} href='/sign-in' bold={this.props.currentPage == "Sign in"} ></NavbarItem> :
                        <NavbarItem item={getUsernameCookie()} label={getUsernameCookie()}></NavbarItem>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    }
}