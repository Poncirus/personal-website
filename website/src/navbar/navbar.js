import React from 'react'
import ReactDOM from 'react-dom'

import '@/navbar/navbar.css'

import NavbarItem from '@/navbar/navbar_item.js'

import { getUsernameCookie } from '@/js/user.js'

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'

export default class TopNavbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [{
                item: "Home",
                href: "/home"
            },
            {
                item: "Tools",
                href: "/tools"
            },
            {
                item: "Articles",
                href: "/articles/article-list"
            },
            {
                item: "About me",
                href: "/about-me"
            },
            {
                item: "VSCode",
                href: "https://code.liaohanwen.com"
            },
            {
                item: "Cloud",
                href: "https://cloud.liaohanwen.com"
            }]
        }
    }


    render() {
        let style = this.props.zIndex == null ? { zIndex: 1030 } : { zIndex: this.props.zIndex }
        return <Navbar expand="md" fixed="top" bg="dark" variant="dark" style={style}>
            <Navbar.Brand href="/">Liao Hanwen</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {this.state.items.map(v => <NavbarItem key={v.item} bold={this.props.currentPage == v.item} {...v}></NavbarItem>)}
                </Nav>
                <Nav>
                    {getUsernameCookie() == null ?
                        <NavbarItem item='Sign in' href='/sign-in' bold={this.props.currentPage == "Sign in"} ></NavbarItem> :
                        <NavbarItem item={getUsernameCookie()}></NavbarItem>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    }
}