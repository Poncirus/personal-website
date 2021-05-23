import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { getLanguageCookie } from '@/js/lang.js'

const labels = require('@/music/labels.json')
const lang = getLanguageCookie()

export default class List extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        var list = this.props.list.map((v, index) => <Music key={v.id} {...v} border={index != this.props.list.length - 1}></Music>)
        return <Container className="py-2 px-2 bg-white rounded shadow border mb-3">
            <Row className="text-muted small py-2 px-2 border-gray border-bottom">
                <Col xs={6} className="text-dark font-weight-bold">
                    {labels['Name'][lang]}
                </Col>
                <Col xs={3} className="text-dark font-weight-bold">
                    {labels['Artist'][lang]}
                </Col>
            </Row>
            {list}
        </Container>
    }
}

class Music extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <Row className={`text-muted small py-2 px-2 border-gray ${this.props.border ? "border-bottom" : null}`}>
            <Col xs={6}>
                {this.props.name}
            </Col>
            <Col xs={3}>
                {this.props.singer}
            </Col>
        </Row>
    }
}