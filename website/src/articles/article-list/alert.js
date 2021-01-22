import React from 'react'
import ReactDOM from 'react-dom'

export default class Alert extends React.Component {
    constructor(props) {
        super(props)
        this.dismiss = this.dismiss.bind(this)
    }

    render() {
        return <div className="alert alert-success alert-dismissible fade shadow show">
            Search
            <strong> {this.props.keyword} </strong>
            <button type="button" className="close" onClick={this.dismiss}>
                <span aria-hidden="true">×</span>
            </button>
        </div>
    }

    dismiss() {
        this.props.filterTitle("")
    }
}