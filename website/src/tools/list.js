import React from 'react'

export default class List extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <main className="container mt-4" role="main">
            {Object.entries(this.props.list).map(([k, v]) => <ListItem key={k} page={k} {...v} switch={this.props.switch}></ListItem>)}
        </main>
    }
}


class ListItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className="card border shadow rounded col-md-4 col-12 mb-3">
            <div className="card-body">
                <h4 className="card-title">{this.props.item}</h4>
                <span className="card-text">{this.props.intro}</span>
                <a onClick={() => { this.props.switch(this.props.page) }} className="stretched-link"></a>
            </div>
        </div>
    }
}