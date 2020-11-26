import React from 'react'

import sha256 from 'sha256'

import { getLanguageCookie } from '@/js/lang.js'

const labels = require('@/tools/labels.json')
const lang = getLanguageCookie()

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
                <label htmlFor="data">{labels["Data"][lang]}</label>
                <textarea className="form-control" id="data" rows='5' onChange={this.change}></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="hash">{labels["SHA-256 hash"][lang]}</label>
                <textarea className="form-control" id="hash" rows='1' readOnly value={this.state.data == '' ? '' : sha256(this.state.data)}></textarea>
            </div>
        </main>
    }
}
