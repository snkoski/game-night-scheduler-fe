import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class GroupCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
    this.joinGroup = this.joinGroup.bind(this);
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/groups/${this.props.group.id}/users`)
      .then(resp => resp.json())
      .then(users => this.setState({ users }))
  }

  joinGroup() {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({group_id: this.props.group.id})
    }
    fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/join_group`, options)
      .then(resp => resp.json())
      .then(user => this.setState({
        users: [...this.state.users, user]
      }))
      .then(() => {
        this.props.addGroup(this.props.group)
      })
  }

  render() {
    const member = this.state.users.filter((user) => {
      return user.id === this.props.user.id
    }).length

    return (
      <ul>
        <h3>{this.props.group.name}</h3>
        <p>Number of members: {this.props.group.number_of_members}</p>
        <p>Meeting day: {this.props.group.regular_meeting_day ? this.props.group.regular_meeting_day : 'TBA'}</p>
        {!member ? <p onClick={this.joinGroup}>Join Group</p> : null }
      </ul>
    )
  }
}

GroupCard.propTypes = {
  user: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  addGroup: PropTypes.func
}
