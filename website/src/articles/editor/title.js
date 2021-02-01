import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import { getLanguageCookie } from '@/js/lang.js'

const labels = require('@/articles/editor/labels.json')
const lang = getLanguageCookie()

export default class Title extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <Row className="justify-content-between">
            <Col xs={12} md={4}>
                <InputGroup className="mb-2">
                    <InputGroup.Prepend>
                        <InputGroup.Text>{labels['Title'][lang]}</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl value={this.props.title} onChange={this.props.changeTitle} />
                </InputGroup>
            </Col>
            <Col xs={12} md={8}>
                <InputGroup className="mb-2">
                    <InputGroup.Prepend>
                    <InputGroup.Text>{labels['Description'][lang]}</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl value={this.props.description} onChange={this.props.changeDescription} />
                </InputGroup>
            </Col>
        </Row>
    }
}