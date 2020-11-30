import React from 'react'
import ReactDOM from 'react-dom'

import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import 'bootstrap/dist/css/bootstrap.min.css'

import TopNavbar from '@/navbar/navbar.js'

import { getLanguageCookie } from '@/js/lang.js'

const labels = require('@/neighbor/labels.json')
const lang = getLanguageCookie()

// set title
document.title = '橘生淮北 - ' + labels['Neighbor'][lang]

class Main extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <Container>
            <TopNavbar currentPage='Neighbor'></TopNavbar>
            <Container className='mt-4'>
                <Neighbor></Neighbor>
                <Subscribe></Subscribe>
            </Container>
        </Container>
    }
}

class Neighbor extends React.Component {
    constructor(props) {
        super(props)

        this.list = [
            {
                profile: "https://img.xiaoyou66.com/images/2020/01/14/nUDD.jpg",
                name: "小游",
                discription: "二次元技术宅",
                href: "https://xiaoyou66.com"
            }
        ]
    }

    render() {
        return <Jumbotron className='py-3 shadow border'>
            <Container>
                <Row>
                    {this.list.map(v => <NeighborItem id={v.name} {...v}></NeighborItem>)}
                </Row>
            </Container>
        </Jumbotron>
    }
}

class NeighborItem extends React.Component {
    render() {
        return <Col xs={12} md={3} className='mt-2 d-flex' style={{ transform: "rotate(0)" }}>
            <img src={this.props.profile} className="mr-3 rounded-lg" style={{ height: '60px' }} />
            <div className="lh-100 mt-1">
                <h5>{this.props.name}</h5>
                <p>{this.props.discription}</p>
            </div>
            <a href={this.props.href} target="_blank" className="stretched-link"></a>
        </Col>
    }
}

class Subscribe extends React.Component {
    render() {
        return <Jumbotron className='py-3 shadow border'>
            <h1 className="font-weight-light">{labels['Become neighbor'][lang]}</h1>
            <hr className="my-3" />
            <Container>
                <Row>
                    <Col xs={12} md={6} className="mt-2">
                        <p className="lead">{labels['Site information'][lang]}</p>
                        <ul className="pl-4">
                            <li className="text-break">{labels['Profile'][lang]}: https://liaohanwen.com/profile.png</li>
                            <li>{labels['Name'][lang]}: 橘生淮北</li>
                            <li>{labels['Discription'][lang]}: 橘生淮北则为枳 </li>
                            <li>{labels['Url'][lang]}: https://liaohanwen.com</li>
                        </ul>
                    </Col>
                    <Col xs={12} md={6} className="mt-2">
                        <p className="lead">{labels['Requirement'][lang]}</p>
                        <ul className="pl-4">
                            <li>{labels['Add my site'][lang]}</li>
                            <li>{labels['It is your personal website'][lang]}</li>
                            <li>{labels['Send your information to '][lang]} <a href="mailto:web@liaohanwen.com" className="text-reset text-decoration-none">web@liaohanwen.com</a></li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </Jumbotron >
    }
}

// main
ReactDOM.render(<Main></Main>, document.getElementById('main'))