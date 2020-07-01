import React from 'react'
import ReactDOM from 'react-dom'

import $ from 'jquery'

import { config } from '@/config/config.js'

export default class Tags extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: [],
            selected: []
        }

        this.clear = this.clear.bind(this)
        this.toggle = this.toggle.bind(this)
        this.refresh = this.refresh.bind(this)
    }

    componentDidMount() {
        this.loadTag()
    }

    render() {
        return <div className="card shadow mb-3">
            <div className="card-header">
                Tags
                <button type="button" className="btn btn-sm btn-outline-secondary float-right my-n1" onClick={this.clear}>Clear</button>
            </div>
            <div className="card-body p-3">
                <div className='btn-group-toggle' data-toggle='buttons'>
                    {this.state.tags.map(v => <TagItem key={v} item={v} active={this.state.selected.includes(v)} toggle={this.toggle}></TagItem>)}
                </div>
            </div>
        </div>
    }

    clear() {
        this.setState({ selected: [] }, this.refresh)
    }

    toggle(e) {
        var click = e.target.getAttribute('item')
        if (this.state.selected.includes(click)) {
            this.setState({ selected: this.state.selected.filter(item => item != click) }, this.refresh)
        } else {
            this.setState({ selected: [...this.state.selected, click] }, this.refresh)
        }
    }

    refresh() {
        this.props.filter({ tags: this.state.selected })
    }

    loadTag() {
        $.get(config.server + "/go/get-tags",
            function (data, status) {
                // request not success
                if (status != "success") {
                    console.log("request not success")
                    return
                }
                // parse data to json object
                var json = JSON.parse(data)

                if (json.Result != "Success") {
                    console.log("tags request not success")
                    return
                }

                this.setState({ tags: json.Tags })
            }.bind(this))
    }
}

class TagItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <label className={`btn btn-sm btn-outline-secondary mr-2 mb-2 ${this.props.active ? "active" : null}`} onChange={this.props.toggle}>
            <input type="checkbox" item={this.props.item} />{this.props.item}
        </label>
    }
}