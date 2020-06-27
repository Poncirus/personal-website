import React from 'react'
import ReactDOM from 'react-dom'

import $ from 'jquery'

import 'bootstrap/dist/css/bootstrap.min.css'

import { config } from '@/config/config.js'
import { getUrlParameter } from '@/js/url.js'
import { getUsernameCookie, getPasswordCookie } from '@/js/user.js'

import Navbar from '@/navbar/navbar.js'
import SecondaryNavbar from '@/secondary_navbar/secondary_navbar.js'
import Pop from '@/components/pop/pop.js'

import Title from '@/articles/editor/title.js'
import Tags from '@/articles/editor/tags.js'
import MDE from '@/articles/editor/mde.js'

// set title
document.title = '橘生淮北 - Editor'

class Main extends React.Component {
    constructor(props) {
        super(props)

        this.changeTitle = this.changeTitle.bind(this)
        this.changeDescription = this.changeDescription.bind(this)
        this.changeTag = this.changeTag.bind(this)
        this.changeMarkdown = this.changeMarkdown.bind(this)
        this.loadArticle = this.loadArticle.bind(this)
        this.setNavbarZIndex = this.setNavbarZIndex.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.save = this.save.bind(this)
        this.delete = this.delete.bind(this)

        this.state = {
            id: null,
            title: "",
            description: "",
            createTime: null,
            lastModification: null,
            tags: [],
            markdown: "",
            navbarZIndex: null,
            modal: {
                title: null,
                content: null,
                show: false,
                callback: null
            }
        }

        this.secondaryNavbarItem = {
            currentPage: getUrlParameter('id') != null ? '' : 'New Article',
            items: [{
                item: "New Article",
                func: () => $(location).prop('href', '/articles/editor')
            }, {
                item: "Article List",
                func: () => $(location).prop('href', '/articles/article_list')
            }],
            buttons: [{
                item: 'Save',
                type: 'btn-success',
                func: this.save
            }, {
                item: 'Delete',
                type: 'btn-danger',
                func: this.delete
            }]
        }

        this.save = this.save.bind(this)
        this.delete = this.delete.bind(this)
    }

    componentDidMount() {
        if (getUsernameCookie() == null) {
            this.setState({
                modal: {
                    title: 'Fail',
                    content: 'Please sign in',
                    show: true,
                    callback: () => $(location).prop('href', '/sign-in')
                }
            })
        }

        this.loadArticle()
    }

    render() {
        // set title
        if (this.state.title == "") {
            document.title = '橘生淮北 - Editor'
        } else {
            document.title = '橘生淮北 - ' + this.state.title
        }

        return <div>
            <Navbar zIndex={this.state.navbarZIndex} currentPage="Articles"></Navbar>
            <SecondaryNavbar {...this.secondaryNavbarItem}></SecondaryNavbar>
            <main className="container mt-4" role="main">
                <Title title={this.state.title} description={this.state.description} changeTitle={this.changeTitle} changeDescription={this.changeDescription}></Title>
                <Tags tags={this.state.tags} changeTag={this.changeTag}></Tags>
                <div className='markdown-body' style={{ zIndex: 1050 }}>
                    <MDE markdown={this.state.markdown} changeMarkdown={this.changeMarkdown} setNavbarZIndex={this.setNavbarZIndex}></MDE>
                </div>
                <div className='mb-3 text-muted' style={{ fontSize: '80%' }}>
                    Powered by
                    <a target="_blank" href="https://github.com/RIP21/react-simplemde-editor" className="mx-1 badge badge-secondary">react-simplemde-editor</a>
                </div>
                <Pop {...this.state.modal} closeModal={this.closeModal}></Pop>
            </main>
        </div >
    }

    setNavbarZIndex(value) {
        this.setState({ navbarZIndex: value })
    }

    save() {
        $.post(config.server + "/go/save-article",
            {
                username: getUsernameCookie(),
                password: getPasswordCookie(),
                id: this.state.id,
                title: this.state.title,
                description: this.state.description,
                markdown: this.state.markdown,
                tags: this.state.tags,
                createTime: this.state.createTime != null ? this.state.createTime : ""
            },
            function (data, status) {
                // request not success
                if (status != "success") {
                    this.setState({
                        modal: {
                            title: 'Fail',
                            content: 'Save article fail',
                            show: true,
                            callback: null
                        }
                    })
                    return
                }
                // parse data to json object
                var json = JSON.parse(data)

                if (json.Result == "Success") {
                    this.setState({ id: json.ID })
                    this.setState({
                        modal: {
                            title: 'Success',
                            content: 'Save article success',
                            show: true,
                            callback: null
                        }
                    })
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
            }.bind(this));
    }

    delete() {
        $.post(config.server + "/go/delete-article",
            {
                username: getUsernameCookie(),
                password: getPasswordCookie(),
                id: this.state.id
            },
            function (data, status) {
                // request not success
                if (status != "success") {
                    this.setState({
                        modal: {
                            title: 'Fail',
                            content: 'Delete article fail',
                            show: true,
                            callback: null
                        }
                    })
                    return
                }
                // parse data to json object
                var json = JSON.parse(data)

                // set result
                if (json.Result == "Success") {
                    this.setState({
                        modal: {
                            title: json.Result,
                            content: 'Delete article successful',
                            show: true,
                            callback: () => $(location).prop('href', '/articles/article_list')
                        }
                    })
                } else {
                    this.setState({
                        modal: {
                            title: json.Result,
                            content: json.Str,
                            show: true,
                            callback: null
                        }
                    })
                }
                return
            }.bind(this))
    }

    changeTitle(e) {
        this.setState({ title: e.target.value })
    }

    changeDescription(e) {
        this.setState({ description: e.target.value })
    }

    changeTag(tags) {
        this.setState({ tags: tags })
    }

    changeMarkdown(value) {
        this.setState({ markdown: value })
    }

    closeModal() {
        if (this.state.modal.callback != null) {
            this.state.modal.callback()
        }

        this.setState({
            modal: {
                title: null,
                content: null,
                show: false
            }
        })
    }

    loadArticle() {
        let id = getUrlParameter('id')
        if (id == null)
            return

        $.post(config.server + "/go/get-article",
            {
                id: id
            },
            function (data, status) {
                // request not success
                if (status != "success") {
                    return
                }
                // parse data to json object
                var json = JSON.parse(data);

                if (json.Result != "Success") {
                    return
                }

                var article = {
                    id: json.Article.ID,
                    title: json.Article.Title,
                    description: json.Article.Description,
                    createTime: json.Article.CreateTime,
                    lastModification: json.Article.LastModification,
                    tags: json.Article.Tags == null ? [] : json.Article.Tags,
                    markdown: json.Article.Markdown
                }

                this.setState(article)

            }.bind(this))
    }
}


// main
ReactDOM.render(<Main></Main>, document.getElementById('main'))