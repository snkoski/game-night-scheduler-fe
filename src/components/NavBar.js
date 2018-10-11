import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';



export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.renderNavBar = this.renderNavBar.bind(this);
    this.renderNavBar2 = this.renderNavBar2.bind(this);
  }


  renderNavBar2() {
    const loggedIn = !!this.props.currentUser.id
    if (loggedIn) {
      return <React.Fragment>
        <Menu.Item as={NavLink} to="/home" name="home">
          <Icon name="home" size="large" />
          <p>Home</p>
        </Menu.Item>
        <Menu.Item
          onClick={this.props.onLogout}
        >
          Log Out
        </Menu.Item>
      </React.Fragment>
    }

    return (
      <React.Fragment>
        <Menu.Item as={NavLink} to="/login" name="login">
          <Icon name="home" size="large" />
          <p>Login</p>
        </Menu.Item>
        <Menu.Item as={NavLink} to="/signup" name="signup">

          <p>Sign Up</p>
        </Menu.Item>
      </React.Fragment>
    )
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
          <Menu.Item
            id="new-event"
            onClick={this.props.onNavBarClick}
          >
            Create New Event
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
        <Menu.Item
          id="signup"
          onClick={this.props.onNavBarClick}
        >
          Sign Up
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
