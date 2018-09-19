import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';



export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.renderNavBar = this.renderNavBar.bind(this);
  }

  renderNavBar() {
    const loggedIn = !!this.props.currentUser.id

    if (loggedIn) {
      return (
        <React.Fragment>
          <Menu.Item
            id="user-home"
            onClick={this.props.onNavBarClick}
          >
            Your Home
          </Menu.Item>
          <Menu.Item
            onClick={this.props.onLogout}
          >
            Log Out
          </Menu.Item>
          <Menu.Item
            id="sync-games"
            onClick={this.props.onNavBarClick}
          >
            Sync Games
          </Menu.Item>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <Menu.Item>
          You Are NOT Logged In
        </Menu.Item>
        <Menu.Item
          id="login"
          onClick={this.props.onNavBarClick}
        >
          Log In
        </Menu.Item>
      </React.Fragment>
    )
  }

  render() {
    console.log(this.props);
    return (
      <Menu className="NavBar" fixed="top">
        {this.renderNavBar()}
      </Menu>
    )
  }
}
