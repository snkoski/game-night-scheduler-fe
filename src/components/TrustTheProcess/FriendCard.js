import React, { Component } from 'react'

export default class FriendCard extends Component {
  constructor(props) {
    super(props);
    this.removeFriend = this.removeFriend.bind(this);
  }

  // removeFriend() {
  //   return  fetch('http://localhost:3000/api/v1/friendships/' + this.props.friend.id, {
  //       method: 'DELETE',
  //       body: JSON.stringify({user_id: this.props.currentUser.id})
  //     })
    //   .then(resp => {this.setState({
    //     activities: []
    //   })
    // })
  }

  render() {
    return (
      <li>
        <h4>{this.props.friend.username}</h4>
        <span onClick={this.removeFriend}>Remove Friend</span>
      </li>
    )
  }
}
