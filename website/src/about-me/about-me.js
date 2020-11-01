import React from 'react'
import ReactDOM from 'react-dom'

import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css'

import TopNavbar from '@/navbar/navbar.js'

import ResumeJPG from '@/about-me/resume/resume.jpg'
import ResumeCNJPG from '@/about-me/resume/resume-cn.jpg'
import ResumePDF from '@/about-me/resume/resume.pdf'
import ResumeCNPDF from '@/about-me/resume/resume-cn.pdf'

import GitHubLogo from '@/about-me/logo/GitHub_Logo.png'
import GitHubMark from '@/about-me/logo/GitHub_Mark.png'
import ZhihuLogo from '@/about-me/logo/Zhihu_Logo.png'
import WeiboLogo from '@/about-me/logo/Weibo_Logo.png'

// set title
document.title = '橘生淮北 - About me'

class Main extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className='container'>
            <TopNavbar currentPage="About me"></TopNavbar>
            <main className="container mt-4" role="main">
                <Resume></Resume>
                <SocialMedia></SocialMedia>
            </main>
        </div>
    }
}

class Resume extends React.Component {
    render() {
        return <div className="jumbotron pt-4 pb-5 shadow border">
            <h1 className="display-4">Resume</h1>
            <hr className="my-3" />
            <Accordion>
                <div className='mb-3'>
                    <Accordion.Toggle as={Button} eventKey='cn' className="btn btn-secondary btn-lg mr-3">Resume - CN</Accordion.Toggle>
                    <Accordion.Toggle as={Button} eventKey='en' className="btn btn-secondary btn-lg mr-3">Resume - EN</Accordion.Toggle>
                    <a role='button' className="btn btn-secondary btn-lg mr-3" href='https://github.com/Poncirus/Resume' target='_blank'>View in GitHub</a>
                </div>
                <Accordion.Collapse eventKey='cn'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 col-md-10' align='center'>
                                <img src={ResumeCNJPG} style={{ width: '100%' }} className='border rounded shadow' />
                            </div>
                            <div className='col-12 col-md-2 mt-3'>
                                <a role='button' className="btn btn-secondary mt-3" href={ResumeCNPDF} target='_blank' download>Download PDF</a>
                                <a role='button' className="btn btn-secondary mt-3" href={ResumeCNJPG} target='_blank' download>Download JPG</a>
                            </div>
                        </div>
                    </div>
                </Accordion.Collapse>
                <Accordion.Collapse eventKey='en'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 col-md-10' align='center'>
                                <img src={ResumeJPG} style={{ width: '100%' }} className='border rounded shadow' />
                            </div>
                            <div className='col-12 col-md-2 mt-3'>
                                <a role='button' className="btn btn-secondary mt-3" href={ResumePDF} target='_blank' download>Download PDF</a>
                                <a role='button' className="btn btn-secondary mt-3" href={ResumeJPG} target='_blank' download>Download JPG</a>
                            </div>
                        </div>
                    </div>
                </Accordion.Collapse>
            </Accordion>
        </div>
    }
}

class SocialMedia extends React.Component {
    render() {
        return <div className="jumbotron pt-4 pb-5 shadow border">
            <h1 className="display-4">Social Media</h1>
            <hr className="my-3" />
            <div className='container'>
                <div className='row'>
                    <div className='col-12 col-md-3' align='center'>
                        <a href='https://github.com/Poncirus' target='_blank' >
                            <img src={GitHubMark} style={{ height: '40px' }} />
                            <img src={GitHubLogo} style={{ height: '60px' }} />
                        </a>
                    </div>
                    <div className='col-12 col-md-3' align='center'>
                        <a href='https://www.zhihu.com/people/liao-han-wen-31' target='_blank' >
                            <img src={ZhihuLogo} style={{ height: '60px', padding: '10px' }} />
                        </a>
                    </div>
                    <div className='col-12 col-md-3' align='center'>
                        <a href='https://www.weibo.com/3502084483/profile' target='_blank' >
                            <img src={WeiboLogo} style={{ height: '60px', padding: '10px' }} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    }
}


// main
ReactDOM.render(<Main></Main >, document.getElementById('main'))