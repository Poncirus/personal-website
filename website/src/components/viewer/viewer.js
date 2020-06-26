import React from "react";
import ReactMarkdown from 'react-markdown'

import 'github-markdown-css/github-markdown.css'

export default class Editor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: 'New input for **EasyMDE**'
        }
    }

    render() {
        return <div className='markdown-body py-3 px-3 rounded shadow border mb-3'>
            <ReactMarkdown source={this.props.Markdown} />
        </div>
    }
}