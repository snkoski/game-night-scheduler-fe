import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';



export default class NavBar extends Component {
  state ={}

  render() {
    const loggedIn = !!this.props.currentUser.id
    console.log(this.props);
    return (
      <Menu className="NavBar" fixed="top">
        {loggedIn ?
          (
            <Menu.Item
              id="user-home"
              onClick={this.props.onNavBarClick}
            >
              Your Home
            </Menu.Item>
          ) :
          (
            <Menu.Item>
              You Are NOT Logged In
            </Menu.Item>
          )}
        {loggedIn ?
          (
            <Menu.Item onClick={this.props.onLogout}>
              Log Out
            </Menu.Item>
          ) :
          (<Menu.Item
            id="login"
            onClick={this.props.onNavBarClick}
           >
            Log In
          </Menu.Item>
          )}

      </Menu>
    )
  }
}
