import React from 'react'
import ReactDOM from 'react-dom'

import { parseTime } from '@/js/time.js'

export default class List extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        var list = this.props.articles.map((v, index) => <Article key={v.ID} {...v} border={index != this.props.articles.length - 1}></Article>)
        return <div className="py-2 px-2 bg-white rounded shadow border mb-3">
            {list}
        </div>
    }
}

class Article extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className={`text-muted small py-2 px-2 border-gray ${this.props.border ? "border-bottom" : null}`} style={{ transform: "rotate(0)" }}>
            <div className="row">
                <div className="col-12 col-md-6">
                    <h5 className="text-dark font-weight-bold"> {this.props.Title} </h5>
                </div>
                <div className="d-none d-md-block col-md-6 text-right"> Created: {parseTime(this.props.CreateTime)} &nbsp; Modified: {parseTime(this.props.LastModification)} </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-8"> {this.props.Description} </div>
                <div className="d-none d-md-block col-md-4 text-right"> {this.props.Tags == null ? "" : this.props.Tags.join(' \u00A0 ')} </div>
            </div> <a href={"/articles/article?id=" + this.props.ID} className="stretched-link"></a>
        </div>
    }
}