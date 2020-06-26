import React from 'react'
import ReactDOM from 'react-dom'

export default class NavbarItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <li className="nav-item">
            <a className={`nav-link ${this.props.bold ? "active" : null}`} href={this.props.href} > {this.props.item} </a>
        </li>
    }
}