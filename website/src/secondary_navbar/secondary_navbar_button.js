import React from 'react'

export default class SecondaryNavbarItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <button className={`btn btn-sm px-3 mr-3 ${this.props.type}`} onClick={this.props.func}>{this.props.item}</button>
    }
}