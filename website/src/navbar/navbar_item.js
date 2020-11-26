import React from 'react'
import ReactDOM from 'react-dom'

import Nav from 'react-bootstrap/Nav'

export default class NavbarItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.item == "divider") {
            return <>
                <div className="divider-horizontal"></div>
                <div className="divider-vertical"></div>
            </>
        }

        if (this.props.item == "divider-horizontal") {
            return <div className="divider-horizontal"></div>
        }

        return <Nav.Item>
            <Nav.Link active={this.props.bold} href={this.props.href} > {this.props.label} </Nav.Link>
        </Nav.Item>
    }
}
