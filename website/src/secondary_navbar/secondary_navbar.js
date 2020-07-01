import React from 'react'
import ReactDOM from 'react-dom'

import '@/secondary_navbar/secondary_navbar.css'

import SecondaryNavbarItem from '@/secondary_navbar/secondary_navbar_item.js'
import SecondaryNavbarButton from '@/secondary_navbar/secondary_navbar_button.js'

export default class SecondaryNavbar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className="nav-scroller bg-white box-shadow justify-content-between d-flex">
            <nav className="nav nav-underline">
                {this.props.items.map(v => <SecondaryNavbarItem key={v.item} bold={this.props.currentPage == v.item} {...v}></SecondaryNavbarItem>)}
            </nav>
            <div className="my-2">
                {this.props.buttons.map(v => <SecondaryNavbarButton key={v.item} {...v}></SecondaryNavbarButton>)}
            </div>
        </div>
    }
}