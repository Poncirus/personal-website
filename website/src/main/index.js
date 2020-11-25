import React from 'react'
import ReactDOM from 'react-dom'

import TopNavbar from '@/navbar/navbar.js'

import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel'

import { getLanguageCookie } from '@/js/lang.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import "@/main/cover.css";

import heartImg from "@/main/heart.png"

const labels = require('@/main/labels.json')
const lang = getLanguageCookie()

// set title
document.title = '橘生淮北'

ReactDOM.render(<TopNavbar></TopNavbar>, document.getElementById('header'))

class Main extends React.Component {
    render() {
        return <div className="mb-4">
            <Carousel indicators={false} fade={true} interval={4000} nextIcon={null} prevIcon={null}>
                <Carousel.Item>
                    <h1>{labels["My Website"][lang]}</h1>
                </Carousel.Item>
                <Carousel.Item>
                    <h1>{labels["Tools"][lang]}</h1>
                    <h4 className="font-weight-light">{labels["Useful tools"][lang]}</h4>
                </Carousel.Item>
                <Carousel.Item>
                    <h1>{labels["Articles"][lang]}</h1>
                    <h4 className="font-weight-light">{labels["My Notes and thoughts"][lang]}</h4>
                </Carousel.Item>
                <Carousel.Item>
                    <h1>{labels["About me"][lang]}</h1>
                    <h4 className="font-weight-light">{labels["My resume & personal information"][lang]}</h4>
                </Carousel.Item>
                <Carousel.Item>
                    <h1>{labels["VSCode"][lang]}</h1>
                    <h4 className="font-weight-light">{labels["Online Vitual Studio Code editor"][lang]}</h4>
                </Carousel.Item>
                <Carousel.Item>
                    <h1>{labels["Cloud"][lang]}</h1>
                    <h4 className="font-weight-light">{labels["My Nextcloud online storage"][lang]}</h4>
                </Carousel.Item>
            </Carousel>
        </div>
    }
}

ReactDOM.render(<Main></Main>, document.getElementById('main'))

class Footer extends React.Component {
    render() {
        return <div>
            <Accordion>
                <Accordion.Collapse eventKey="love">
                    <div>
                        <p className="lead font-weight-light">{labels["I will Love You and Respect You Till the End of My Life"][lang]}</p>
                        <img className="my-3" src={heartImg} alt="heart png" height="150" />
                        <p className="lead font-weight-light">2019/3/26</p>
                    </div>
                </Accordion.Collapse>
                <Accordion.Toggle as={Button} variant="link" eventKey="love" className="text-secondary text-decoration-none">Website for My Love</Accordion.Toggle>
            </Accordion>
            <a href="http://www.beian.miit.gov.cn" className="text-dark">京ICP备17044828号-1</a>
        </div>
    }
}

ReactDOM.render(<Footer></Footer>, document.getElementById('footer'))