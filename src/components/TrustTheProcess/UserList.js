import React, { Component } from 'react';
import UserCard from './UserCard';

export default class UserList extends Component {
state = {
  users: []
}

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/users`)
      .then(resp => resp.json())
      .then(users => {this.setState({ users })
    })
  }

  render() {
    return (
      <ul>{this.state.users.map((user) => {
        return <UserCard key={user.username} user={user} currentUser={this.props.user}/>
      })}</ul>
    )
  }
}
