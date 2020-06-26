import React from "react";
import SimpleMDEReact from "react-simplemde-editor";

import $ from 'jquery'

import "easymde/dist/easymde.min.css";
import 'github-markdown-css/github-markdown.css'

import { config } from '@/config/config.js'

export default class MDE extends React.Component {
    constructor(props) {
        super(props)
        this.onToggleFullScreen = this.onToggleFullScreen.bind(this)

        this.options = {
            onToggleFullScreen: this.onToggleFullScreen,
            sideBySideFullscreen: false,
            uploadImage: true,
            imageUploadFunction: this.imageUpload,
            imageUploadEndpoint: config.server + '/go/image-upload'
        }
    }

    render() {
        var mde = <SimpleMDEReact value={this.props.markdown} onChange={this.props.changeMarkdown} options={this.options} />
        return mde
    }

    onToggleFullScreen(isFullScreen) {
        if (isFullScreen) {
            this.props.setNavbarZIndex(0);
        } else {
            this.props.setNavbarZIndex(null);
        }
    }
}