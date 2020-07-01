import React from 'react'
import ReactDOM from 'react-dom'

import $ from 'jquery'

import 'bootstrap/dist/css/bootstrap.min.css'

import { config } from '@/config/config.js'

import Navbar from '@/navbar/navbar.js'
import SecondaryNavbar from '@/secondary_navbar/secondary_navbar.js'

import Search from '@/articles/article-list/search.js'
import Tags from '@/articles/article-list/tags.js'
import List from '@/articles/article-list/list.js'
import Alert from '@/articles/article-list/alert.js'

// set title
document.title = '橘生淮北 - Article List'

// navbar
const navbar = <Navbar currentPage="Articles"></Navbar>
ReactDOM.render(navbar, document.getElementById('navbar'))

// secondary navbar
const secondaryNavbarItem = {
    currentPage: "Article List",
    items: [{
        item: "New Article",
        func: () => $(location).prop('href', '/articles/editor')
    }, {
        item: "Article List",
        func: () => $(location).prop('href', '/articles/article-list')
    }],
    buttons: []
}
const secondaryNavbar = <SecondaryNavbar {...secondaryNavbarItem}></SecondaryNavbar>
ReactDOM.render(secondaryNavbar, document.getElementById('secondary-navbar'))

// webpage
class ArtileList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            alert: {},
            filter: {}
        }
        this.refresh = this.refresh.bind(this)
        this.filter = this.filter.bind(this)
    }

    componentDidMount() {
        this.refresh()
    }

    render() {
        var alert = null;
        if (Object.keys(this.state.alert) != 0) {
            alert = <Alert {...this.state.alert} filter={this.filter}></Alert>
        }

        return <div className="row">
            <div className="col-12 col-md-8">
                {alert}
                <List articles={this.state.articles}></List>
            </div>
            <div className="col-12 col-md-4">
                <Search filter={this.filter}></Search>
                <Tags filter={this.filter}></Tags>
            </div>
        </div>
    }

    refresh() {
        // clear alert
        this.setState({ alert: {} })


        if (this.state.filter.hasOwnProperty('keyword')) {
            $.post(config.server + "/go/title-search",
                {
                    title: this.state.filter.keyword
                },
                function (data, status) {
                    // request not success
                    if (status != "success") {
                        return
                    }
                    // parse data to json object
                    var json = JSON.parse(data)

                    if (json.Result != "Success") {
                        return
                    }

                    // articles
                    this.setState({ articles: json.Articles })

                    // alert
                    this.setState({ alert: { keyword: this.state.filter.keyword } })
                }.bind(this));
            return
        }

        if (this.state.filter.hasOwnProperty('tags')) {
            $.post(config.server + "/go/tag-search",
                {
                    tags: this.state.filter.tags
                },
                function (data, status) {
                    // request not success
                    if (status != "success") {
                        return
                    }
                    // parse data to json object
                    var json = JSON.parse(data)

                    if (json.Result != "Success") {
                        return
                    }

                    // articles
                    this.setState({ articles: json.Articles })
                }.bind(this));
            return
        }

        $.get(config.server + "/go/get-article-list",
            function (data, status) {
                // request not success
                if (status != "success") {
                    console.log("request not success")
                    return;
                }
                // parse data to json object
                var json = JSON.parse(data);

                if (json.Result != "Success") {
                    console.log("request not success")
                    return;
                }

                this.setState({ articles: json.Articles })
            }.bind(this))
    }

    filter(filter) {
        this.setState({ filter: filter }, this.refresh)
    }
}

// main
ReactDOM.render(<ArtileList></ArtileList>, document.getElementById('main'))