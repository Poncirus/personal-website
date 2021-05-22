import React from 'react'

import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"

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
        return <Container className="mt-4" role="main">
            <Form.Group>
                <Form.Label>{labels["Data"][lang]}</Form.Label>
                <Form.Control as="textarea" rows={5} onChange={this.change}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>{labels["SHA-256 hash"][lang]}</Form.Label>
                <Form.Control as="textarea" rows={1} readOnly value={this.state.data == '' ? '' : sha256(this.state.data)}></Form.Control>
            </Form.Group>
        </Container>
    }
}
