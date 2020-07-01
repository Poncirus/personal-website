import React from 'react'
import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'

export default class Pop extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <Modal show={this.props.show} onHide={this.props.closeModal} centered backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{this.props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.props.content}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.props.closeModal}>
                    close
                </Button>
            </Modal.Footer>
        </Modal>
    }
}