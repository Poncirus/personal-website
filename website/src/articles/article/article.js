import React from 'react'
import ReactDOM from 'react-dom'

import $ from 'jquery'

import 'bootstrap/dist/css/bootstrap.min.css'

import { config } from '@/config/config.js'
import { parseTime } from '@/js/time.js'
import { getUrlParameter } from '@/js/url.js'

import TopNavbar from '@/navbar/navbar.js'
import SecondaryNavbar from '@/secondary_navbar/secondary_navbar.js'

import Viewer from '@/components/viewer/viewer.js'

import { getLanguageCookie } from '@/js/lang.js'

const labels = require('@/articles/article/labels.json')
const lang = getLanguageCookie()

// set title
document.title = '橘生淮北 - ' + labels['Article'][lang]

// navbar
const navbar = <TopNavbar currentPage="Articles"></TopNavbar>
ReactDOM.render(navbar, document.getElementById('navbar'))

// secondary navbar
const secondaryNavbarItem = {
    currentPage: "",
    items: [{
        item: labels["New Article"][lang],
        func: () => $(location).prop('href', '/articles/editor')
    }, {
        item: labels["Article List"][lang],
        func: () => $(location).prop('href', '/articles/article-list')
    }],
    buttons: [{
        item: labels['Edit'][lang],
        type: 'btn-success',
        func: () => $(location).prop('href', '/articles/editor?id=' + getUrlParameter("id"))
    }]
}
const secondaryNavbar = <SecondaryNavbar {...secondaryNavbarItem}></SecondaryNavbar>
ReactDOM.render(secondaryNavbar, document.getElementById('secondary-navbar'))

// webpage
class Article extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            article: {}
        }
        this.refresh = this.refresh.bind(this)
    }

    componentDidMount() {
        this.refresh()
    }

    render() {
        if (Object.keys(this.state.article) == 0)
            return null

        return <div>
            <div className="row justify-content-between">
                <div className="mb-2 col-12 col-md">
                    <h3> {this.state.article.Title} </h3>
                </div>
                <div className="col-12 col-md-6 mb-2">
                    <div className="d-none d-md-block text-right mt-3">
                        {labels['Created'][lang]}: {parseTime(this.state.article.CreateTime)} &nbsp; {labels['Modified'][lang]}: {parseTime(this.state.article.LastModification)}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="input-group mb-2 col-md col-12">
                    <h6> {this.state.article.Description} </h6>
                </div>
                <div className="col-12 col-md-6 mb-2">
                    <h6 className="d-none d-md-block text-right">
                        {this.state.article.Tags == null ? "" : this.state.article.Tags.map(v => <span key={v}> &nbsp; {v} </span>)}
                    </h6>
                </div>
            </div>
            <Viewer {...this.state.article}></Viewer>
            <div className='my-3 text-muted' style={{ fontSize: '80%' }}>
                {labels['Powered by'][lang]}
                <a target="_blank" href="https://github.com/rexxars/react-markdown" className="mx-1 badge badge-secondary">react-markdown</a>
                {labels['and'][lang]}
                <a target="_blank" href="https://github.com/sindresorhus/github-markdown-css" className="mx-1 badge badge-secondary">github-markdown-css</a>
            </div>
        </div>
    }

    refresh() {
        var id = getUrlParameter("id");

        $.post(config.server + "/go/get-article",
            {
                id: id
            },
            function (data, status) {
                // request not success
                if (status != "success") {
                    return;
                }
                // parse data to json object
                var json = JSON.parse(data);

                if (json.Result != "Success") {
                    return;
                }


                document.title = '橘生淮北 - ' + json.Article.Title
                this.setState({ article: json.Article })
            }.bind(this))
    }
}

// main
ReactDOM.render(<Article></Article>, document.getElementById('main'))