import React from 'react'

import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"

import { getLanguageCookie } from '@/js/lang.js'

const labels = require('@/tools/labels.json')
const lang = getLanguageCookie()

export default class URL extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            encode: "",
            decode: ""
        }

        this.encode = this.encode.bind(this)
        this.decode = this.decode.bind(this)
    }

    encode(e) {
        this.setState({ 
            encode: e.target.value,
            decode: decodeURI(e.target.value)
        })
    }

    decode(e) {
        this.setState({
            encode: encodeURI(e.target.value),
            decode: e.target.value 
        })
    }

    render() {
        return <Container className="mt-4" role="main">
            <Form.Group>
                <Form.Label>{labels["URL Encode"][lang]}</Form.Label>
                <Form.Control onChange={this.encode} value={this.state.encode}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>{labels["URL Decode"][lang]}</Form.Label>
                <Form.Control onChange={this.decode} value={this.state.decode}></Form.Control>
            </Form.Group>
        </Container>
    }
}
