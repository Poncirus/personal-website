import React from 'react'
import ReactDOM from 'react-dom'

import $ from 'jquery'

import sha256 from 'sha256'
import Cookies from 'js-cookie'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@/sign-in/sign.css'

import { config } from '@/config/config.js'

import TopNavbar from '@/navbar/navbar.js'
import Pop from '@/components/pop/pop.js'

// set title
document.title = '橘生淮北 - Sign in'

class Main extends React.Component {
    constructor(props) {
        super(props)

        this.closeModal = this.closeModal.bind(this)
        this.sign = this.sign.bind(this)
        this.changeUsername = this.changeUsername.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.changeRemember = this.changeRemember.bind(this)

        this.state = {
            username: "",
            password: "",
            remember: false,
            modal: {
                title: null,
                content: null,
                show: false,
                callback: null
            }
        }
    }

    render() {
        return <div className='container'>
            <TopNavbar currentPage="Sign in"></TopNavbar>
            <main className="container mt-4 text-center" role="main">
                <div className="form-signin">
                    <img width="128" height="128" className="mb-5" alt="" src="/android-chrome-256x256.png" />
                    <input className="form-control" id="username" autoFocus="" required="" type="username" placeholder="Username" onChange={this.changeUsername} />
                    <input className="form-control" id="password" required="" type="password" placeholder="Password" onChange={this.changePassword} />
                    <div className="custom-control custom-checkbox mb-3">
                        <input type="checkbox" className="custom-control-input" onChange={this.changeRemember} id='remember' />
                        <label className="custom-control-label" htmlFor="remember">Remember me</label>
                    </div>
                    <button className="btn btn-lg btn-secondary btn-block" onClick={this.sign}>Sign in</button>
                </div>
                <Pop {...this.state.modal} closeModal={this.closeModal}></Pop>
            </main>
        </div>
    }

    sign() {
        let shaPassword = sha256(this.state.password)
        $.post(config.server + "/go/sign-in",
            {
                username: this.state.username,
                password: shaPassword
            },
            function (data, status) {
                // request not success
                if (status != "success") {
                    this.setState({
                        modal: {
                            title: 'Fail',
                            content: 'Sign in fail',
                            show: true,
                            callback: null
                        }
                    })
                    return;
                }
                // parse data to json object
                var json = JSON.parse(data);

                if (json.Result == "Success") {
                    if (this.state.remember) {
                        Cookies.set('username', this.state.username, { expires: 365 })
                        Cookies.set('password', shaPassword, { expires: 365 })
                    } else {
                        Cookies.set('username', this.state.username)
                        Cookies.set('password', shaPassword)
                    }

                    window.history.go(-1)
                    return
                }

                this.setState({
                    modal: {
                        title: json.Result,
                        content: json.Str,
                        show: true,
                        callback: null
                    }
                })
                return
            }.bind(this))
    }

    changeUsername(e) {
        this.setState({ username: e.target.value })
    }

    changePassword(e) {
        this.setState({ password: e.target.value })
    }

    changeRemember(e) {
        this.setState({ remember: e.target.checked })
    }

    closeModal() {
        this.setState({
            modal: {
                title: null,
                content: null,
                show: false
            }
        })
    }
}


// main
ReactDOM.render(<Main></Main >, document.getElementById('main'))