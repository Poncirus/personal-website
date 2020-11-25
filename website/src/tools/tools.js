import React from 'react'
import ReactDOM from 'react-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import TopNavbar from '@/navbar/navbar.js'
import SecondaryNavbar from '../secondary_navbar/secondary_navbar'

import List from '@/tools/list.js'
import Sha256 from '@/tools/sha256.js'

import { getUrlParameter } from '@/js/url.js'

class Main extends React.Component {
    constructor(props) {
        super(props)

        this.toolList = {
            sha256: {
                item: 'sha256',
                intro: 'sha256 encryption'
            }
        }

        let tool = getUrlParameter("tool")
        if (tool == null) {
            tool = "list"
        }

        this.state = {
            current: tool
        }

        this.switchPage = this.switchPage.bind(this)
    }

    switchPage(page) {
        this.setState({ current: page })
        history.pushState(null, "", "?tool=" + page)
    }

    render() {
        let page = null
        switch (this.state.current) {
            case 'list':
                page = <List list={this.toolList} switch={this.switchPage}></List>
                break;
            case 'sha256':
                page = <Sha256></Sha256>
                break;

            default:
                alert('tool does not exist')
                page = <List list={this.toolList} switch={this.switchPage}></List>
                break;
        }

        let items = []
        items.push({ item: 'list', func: () => { this.switchPage('list') } })
        Object.keys(this.toolList).forEach(e => {
            let obj = {
                item: e,
                func: () => { this.switchPage(e) }
            }
            items.push(obj)
        });

        return <div>
            <TopNavbar currentPage="Tools"></TopNavbar>
            <SecondaryNavbar currentPage={this.state.current} items={items} buttons={[]}></SecondaryNavbar>
            {page}
        </div>
    }
}

// main
ReactDOM.render(<Main></Main>, document.getElementById('main'))