import React from 'react'
import ReactDOM from 'react-dom'

export default class Search extends React.Component {
    constructor(props) {
        super(props)

        this.state = { keyword: "" }

        this.search = this.search.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ keyword: e.target.value });
    }

    render() {
        return <div className="card shadow mb-3">
            <div className="card-header">
                Search
            </div>
            <div className="card-body">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Title" onChange={this.handleChange} />
                    <div className="input-group-append">
                        <button type="button" className="btn btn-outline-secondary" onClick={this.search}>Search</button>
                    </div>
                </div>
            </div>
        </div>
    }

    search() {
        this.props.filter({ keyword: this.state.keyword })
    }
}