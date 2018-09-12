import React, { Component } from 'react';

class UserList extends Component {
  render() {
    return (
      <div>
        <h1>User List</h1>
        {this.props.users.map((user) => {
          return <p key={user.username}>{user.username} {user.email}</p>
        })}
      </div>
    )
  }
}

UserList.defaultProps = {
  users: [
    {
      username: 'User1',
      email: 'TestEmail1'
    },
    {
      username: 'User2',
      email: 'TestEmail2'
    }
  ]
}

export default UserList;
