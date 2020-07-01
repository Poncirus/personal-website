import React from 'react'

import sha256 from 'sha256'

export default class Sha256 extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: ""
        }

        this.change = this.change.bind(this)
    }

    change(e) {
        this.setState({ data: e.target.value })
    }

    render() {
        return <main className="container mt-4" role="main">
            <div className="form-group">
                <label htmlFor="data">Data</label>
                <textarea className="form-control" id="data" rows='5' onChange={this.change}></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="hash">SHA-256 hash</label>
                <textarea className="form-control" id="hash" rows='1' readOnly value={this.state.data == '' ? '' : sha256(this.state.data)}></textarea>
            </div>
        </main>
    }
}
