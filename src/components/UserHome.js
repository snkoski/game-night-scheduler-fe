import React, { Component } from 'react';

export default class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {

    return (
      <div className="UserHome">
        <h1>Hello {this.props.user.username}</h1>
        <h3 id="user-games" onClick={this.props.changePage}>Your Games List</h3>
      </div>
    )
  }
}
