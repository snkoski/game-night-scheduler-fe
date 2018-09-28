import React from 'react';

class UserCard extends React.Component {
constructor(props) {
  super(props);

  this.addFriend = this.addFriend.bind(this);
}
  addFriend(e) {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({user_id: this.props.currentUser.id, friend_id: this.props.user.id})
    }
    fetch(`http://localhost:3000/api/v1/friendships`, options)
      .then(resp => resp.json())
  }

  render() {
    return (
      <li>
        <p>{this.props.user.username}</p>
        <span onClick={this.addFriend}>Add as friend</span>
        {/* <span>Remove friend</span> */}
      </li>
    )
  }
}

export default UserCard;
