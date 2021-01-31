import React from 'react'

import { parseTime } from '@/js/time.js'

import { getLanguageCookie } from '@/js/lang.js'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const labels = require('@/articles/article-list/labels.json')
const lang = getLanguageCookie()

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
            <Row>
                <Col xs={12} md={6}>
                    <h5 className="text-dark font-weight-bold"> {this.props.Title} </h5>
                </Col>
                <Col md={6} xs={0} className="d-none d-md-block text-right"> 
                    {labels['Created'][lang]}: {parseTime(this.props.CreateTime)} &nbsp; {labels['Modified'][lang]}: {parseTime(this.props.LastModification)} 
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={8}>
                    {this.props.Description}
                </Col>
                <Col md={4} xs={0} className="d-none d-md-block text-right">
                    {this.props.Tags == null ? "" : this.props.Tags.join(' \u00A0 ')}
                </Col>
            </Row> <a href={"/articles/article?id=" + this.props.ID} className="stretched-link"></a>
        </div>
    }
}