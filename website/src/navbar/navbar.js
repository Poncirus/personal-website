import React from 'react'
import ReactDOM from 'react-dom'

import '@/navbar/navbar.css'

import NavbarItem from '@/navbar/navbar_item.js'

import { getUsernameCookie } from '@/js/user.js'

export default class Navbar extends React.Component {
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
                href: "/articles/article_list"
            },
            {
                item: "About me",
                href: "/about-me"
            }]
        }
    }


    render() {
        let style = this.props.zIndex == null ? { zIndex: 1030 } : { zIndex: this.props.zIndex }
        return <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-dark" style={style}>
            <a className="navbar-brand" href="/">Liao Hanwen</a>
            <button className="navbar-toggler p-0 border-0" type="button" data-toggle="offcanvas">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="navbar-collapse offcanvas-collapse">
                <ul className="navbar-nav mr-auto">
                    {this.state.items.map(v => <NavbarItem key={v.item} bold={this.props.currentPage == v.item} {...v}></NavbarItem>)}
                </ul>
                <div>
                    <ul className="navbar-nav mr-auto">
                        {getUsernameCookie() == null ?
                            <NavbarItem item='Sign in' href='/sign-in' bold={this.props.currentPage == "Sign in"} ></NavbarItem> :
                            <NavbarItem item={getUsernameCookie()}></NavbarItem>}
                    </ul>
                </div>
            </div>
        </nav>
    }
}