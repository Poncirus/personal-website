import React from 'react'
import ReactDOM from 'react-dom'

import Nav from 'react-bootstrap/Nav'

export default class NavbarItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <Nav.Item>
            <Nav.Link active={this.props.bold} href={this.props.href} > {this.props.label} </Nav.Link>
        </Nav.Item>
    }
}