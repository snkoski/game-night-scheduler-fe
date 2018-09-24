import React, { Component } from 'react'

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <input type="text"
        name="search"
        value={this.props.search}
        onChange={this.props.handleSearch}
      />
    )
  }
}
