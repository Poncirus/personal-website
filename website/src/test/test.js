import React from "react";
import ReactDOM from 'react-dom'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

class Main extends React.Component {
    render() {
        return <SimpleMDE />;
    }
}

// main
ReactDOM.render(<Main></Main>, document.getElementById('main'))