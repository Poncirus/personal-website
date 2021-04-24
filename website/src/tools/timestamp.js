import React from 'react'

import { getLanguageCookie } from '@/js/lang.js'

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"

import moment from "moment"

const labels = require('@/tools/labels.json')
const lang = getLanguageCookie()

export default class Timestamp extends React.Component {
    constructor(props) {
        super(props)

        this.delete = this.delete.bind(this)
        this.add = this.add.bind(this)

        this.state = {
            ids: 1,
            converters: [<Converter id={0} delete={this.delete}></Converter>]
        }
    }

    delete(id) {
        let converters = [...this.state.converters]
        for (let i = 0; i <= converters.length-1; i++) {
            if (converters[i].props.id == id) {
                converters.splice(i, 1)
                break
            }
        }
        this.setState({ converters: converters })
    }

    add() {
        let converters = this.state.converters
        converters.push(<Converter id={this.state.ids} delete={this.delete}></Converter>)
        this.setState({ converters: converters })
        this.setState({ ids: this.state.ids + 1 })
    }

    render() {
        return <Container className="mt-4" role="main">
            {this.state.converters.map((c, idx) => {
                return <div key={c.props.id}>
                    {c}
                    {idx != this.state.converters.length - 1 ? <hr/> : null }
                </div>
            })}
            <hr />
            <Row className="my-3">
                <Col>
                    <Button variant="success" onClick={this.add}>{labels["Add converter"][lang]}</Button>
                </Col>
            </Row>
        </Container>
    }
}

class Converter extends React.Component {
    constructor(props) {
        super(props)

        this.format = "YYYY-MM-DD HH:mm:ss"

        this.state = {
            timestamp: moment().format("x"),
            time: moment().format(this.format)
        }


        this.changeTimestamp = this.changeTimestamp.bind(this)
        this.changeTime = this.changeTime.bind(this)
        this.delete = this.delete.bind(this)
    }

    changeTimestamp(e) {
        var timestamp = parseInt(e.target.value)
        this.setState({ timestamp: e.target.value })
        this.setState({ time: moment.unix(timestamp).format(this.format) != "Invalid date" ? moment(timestamp).format(this.format) : "" })
    }

    changeTime(e) {
        this.setState({ timestamp: moment(e.target.value).format("x") != "Invalid date" ? moment(e.target.value).format("x") : ""})
        this.setState({ time: e.target.value })
    }

    delete() {
        this.props.delete(this.props.id)
    }

    render() {
        return <Row>
            <Col xs={10} md>
                <InputGroup className="my-2">
                    <InputGroup.Prepend>
                        <InputGroup.Text>{labels["Unix timestamp"][lang]}</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl onChange={this.changeTimestamp} value={this.state.timestamp} />
                </InputGroup>
            </Col>
            <Col xs={10} md>
                <InputGroup className="my-2">
                    <InputGroup.Prepend>
                        <InputGroup.Text>{labels["Time"][lang]}</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl onChange={this.changeTime} value={this.state.time} />
                </InputGroup>
            </Col>
            <Button variant="danger" onClick={this.delete} className="my-2">{labels["Delete"][lang]}</Button>
        </Row>
    }
}