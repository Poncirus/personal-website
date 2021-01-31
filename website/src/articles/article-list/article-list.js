import React from 'react'
import ReactDOM from 'react-dom'

import $ from 'jquery'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'

import { config } from '@/config/config.js'

import TopNavbar from '@/navbar/navbar.js'
import SecondaryNavbar from '@/secondary_navbar/secondary_navbar.js'

import Search from '@/articles/article-list/search.js'
import Tags from '@/articles/article-list/tags.js'
import List from '@/articles/article-list/list.js'
import Warning from '@/articles/article-list/warning.js'

import { getLanguageCookie } from '@/js/lang.js'

const labels = require('@/articles/article-list/labels.json')
const lang = getLanguageCookie()

// set title
document.title = '橘生淮北 - ' + labels['Article List'][lang]

// navbar
const navbar = <TopNavbar currentPage="Articles"></TopNavbar>
ReactDOM.render(navbar, document.getElementById('navbar'))

// secondary navbar
const secondaryNavbarItem = {
    currentPage: labels["Article List"][lang],
    items: [{
        item: labels["New Article"][lang],
        func: () => $(location).prop('href', '/articles/editor')
    }, {
        item: labels["Article List"][lang],
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

            title: "",
            tags: [],
            count: 30,
            offset: 0,
            sort: "createtime",
            order: -1
        }
        this.refresh = this.refresh.bind(this)
        this.filterTitle = this.filterTitle.bind(this)
        this.filterTags = this.filterTags.bind(this)
    }

    componentDidMount() {
        this.refresh()
    }

    render() {
        var alert = null;
        if (Object.keys(this.state.alert) != 0) {
            alert = <Warning {...this.state.alert} filterTitle={this.filterTitle}></Warning>
        }

        return <Row>
            <Col xs={12} md={8}>
                {alert}
                <List articles={this.state.articles}></List>
            </Col>
            <Col xs={12} md={4}>
                <Search filterTitle={this.filterTitle}></Search>
                <Tags filterTags={this.filterTags}></Tags>
            </Col>
        </Row>
    }

    refresh() {
        // set alert
        if (this.state.title != "") {
            this.setState({ alert: { keyword: this.state.title } })
        } else {
            this.setState({ alert: {} })
        }

        // set articles
        $.post(config.server + "/go/search-article",
                {
                    title: this.state.title,
                    tags: this.state.tags,
                    count: this.state.count,
                    offset: this.state.offset,
                    sort: this.state.sort,
                    order: this.state.order
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
    }

    filterTitle(title) {
        this.setState({ title: title }, this.refresh)
    }

    filterTags(tags) {
        this.setState({tags: tags}, this.refresh)
    }
}

// main
ReactDOM.render(<ArtileList></ArtileList>, document.getElementById('main'))