import React from 'react'

import $ from 'jquery'

import { config } from '@/config/config.js'

export default class Tags extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tagInput: "",
            tagList: []
        }

        this.changeTagInput = this.changeTagInput.bind(this)
        this.addTag = this.addTag.bind(this)
        this.loadTags = this.loadTags.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    componentDidMount() {
        this.loadTags()
    }

    render() {
        return <div className="card mb-3">
            <div className="card-body p-2">
                <div className="row">
                    <div className="col-12 col-md-10">
                        <div className='btn-group-toggle' data-toggle='buttons'>
                            {this.state.tagList.map(v => <TagItem key={v} item={v} toggle={this.toggle} active={this.props.tags.includes(v)}></TagItem>)}
                        </div>
                    </div>
                    <div className="col-12 col-md-2">
                        <div className="input-group input-group-sm">
                            <input type="text" className="form-control" onChange={this.changeTagInput} value={this.state.tagInput} />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button" onClick={this.addTag}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    loadTags(tags) {
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

                this.setState({ tagList: json.Tags })

            }.bind(this));
    }

    changeTagInput(e) {
        this.setState({ tagInput: e.target.value })
    }

    addTag() {
        this.setState({ tagList: [...this.state.tagList, this.state.tagInput] })
        this.props.changeTag([...this.props.tags, this.state.tagInput])
        this.setState({ tagInput: "" })
    }

    toggle(e) {
        let click = e.target.getAttribute('item')
        if (this.props.tags.includes(click)) {
            this.props.changeTag(this.props.tags.filter(item => item != click))
        } else {
            this.props.changeTag([...this.props.tags, click])
        }
    }
}


class TagItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <label className={`btn btn-sm btn-outline-secondary mr-1 ${this.props.active ? "active" : null}`} onChange={this.props.toggle}>
            <input type="checkbox" item={this.props.item} />{this.props.item}
        </label>
    }
}