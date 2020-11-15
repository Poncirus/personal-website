import React from 'react'
import ReactDOM from 'react-dom'

export default class Panel extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className="jumbotron py-3 shadow border">
            <h1 className="display-4">{this.props.header}</h1>
            <p className="lead">{this.props.intro}</p>
            <hr className="my-3" />
            {this.props.items.map(v => <PanelItem key={v.item} {...v}></PanelItem>)}
        </div>
    }
}

class PanelItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <a className="btn btn-secondary btn-lg mr-3 mb-2" href={this.props.href} role="button">{this.props.item}</a>
    }
}