import React, { Component } from 'react';
import FriendCard from './FriendCard';

export default class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: {
        friendships:[],
        users: []
      }
    }
    this.fetchFriendships = this.fetchFriendships.bind(this);
    this.fetchFriends = this.fetchFriends.bind(this);
  }

  componentDidMount() {
    this.fetchFriendships()
    this.fetchFriends()
  }

  fetchFriendships() {
    fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/friendships`)
      .then(resp => resp.json())
      .then(friendships => this.setState(prevState => {
            return {
              ...prevState,
              friends: {
                ...prevState.friends,
                friendships: friendships
              }
            };
          }))
  }

  fetchFriends() {
    fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/friends`)
      .then(resp => resp.json())
      .then(friends => this.setState(prevState => {
            return {
              ...prevState,
              friends: {
                ...prevState.friends,
                users: friends
              }
            };
          }))
  }


  render() {
    debugger
    return (
      // <ul>{this.state.friends.map((friend) => {
      //   return <FriendCard key={friend.user.username} friend={friend} currentUser={this.props.user} />
      // })}</ul>
      <div>hi</div>
    )
  }
}
