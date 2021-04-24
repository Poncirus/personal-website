import React from 'react'

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class List extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <Container className="mt-4">
            <Row>
                {Object.entries(this.props.list).map(([k, v]) => <ListItem key={k} page={k} {...v} switch={this.props.switch}></ListItem>)}
            </Row>
        </Container>
    }
}


class ListItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <Col md={4} xs={12} className="mb-3">
            <Card className="border shadow rounded">
                <Card.Body>
                    <h4 className="card-title">{this.props.label}</h4>
                    <span className="card-text">{this.props.intro}</span>
                    <a onClick={() => { this.props.switch(this.props.page) }} className="stretched-link"></a>
                </Card.Body>
            </Card>
        </Col>
    }
}