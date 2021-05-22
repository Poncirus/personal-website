import React from "react";
import ReactMarkdown from 'react-markdown'

import 'github-markdown-css/github-markdown.css'

export default class Editor extends React.Component {
    render() {
        return <div className='markdown-body py-3 px-3 rounded shadow border mb-3'>
            <ReactMarkdown>{this.props.Markdown}</ReactMarkdown>
        </div>
    }
}