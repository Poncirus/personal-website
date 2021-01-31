import React from 'react'

import Alert from 'react-bootstrap/Alert'

export default class Warning extends React.Component {
    constructor(props) {
        super(props)
        this.dismiss = this.dismiss.bind(this)
    }

    render() {
        return <Alert variant="success" dismissible className="fade shadow show" onClose={this.dismiss}>
            Search
            <strong> {this.props.keyword} </strong>
        </Alert>
    }

    dismiss() {
        this.props.filterTitle("")
    }
}