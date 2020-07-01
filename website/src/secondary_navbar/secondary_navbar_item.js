import React from 'react'

export default class SecondaryNavbarItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <a role="button" className={`nav-link ${this.props.bold ? "active" : null}`} onClick={this.props.func} > {this.props.item}</a>
    }
}