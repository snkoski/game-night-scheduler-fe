import React, { Component } from 'react';
import './App.css';
// import {Switch, Route} from 'react-router-dom';

import Welcome from './components/Welcome';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import SignupForm from './components/SignupForm';
import UserHome from './components/UserHome';
import SyncGamesPage from './components/gameComponents/SyncGamesPage';
import LoadingIndicator from './components/LoadingIndicator';
import GroupPage from './components/groupComponents/GroupPage';
import NewEventForm from './components/eventComponents/NewEventForm';

class App extends Component {
constructor(props) {
  super(props);
  this.state = {
    isLoading: true,
    userGames: [],
    currentGroup: {},
    activeItem: 'welcome',
    auth: {
      currentUser: {}
    }
  };
  this.renderContent = this.renderContent.bind(this);
  this.handlePageChange = this.handlePageChange.bind(this);
  // this.handleNavBarClick = this.handleNavBarClick.bind(this);
  this.handleLogout = this.handleLogout.bind(this);
  this.handleLogin = this.handleLogin.bind(this);
  this.goToUserHome = this.goToUserHome.bind(this);
  this.getCurrentGroup = this.getCurrentGroup.bind(this);
}

  componentDidMount() {
    this._timer = setTimeout(() => this.setState({ isLoading: false }), 2000
  );

    const token = localStorage.getItem('token')
    if (token) {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': token
        }
      }
    fetch('http://localhost:3000/api/v1/reauth', options)
      .then(resp => resp.json())
      .then(user => { this.setState({
        auth: {
          currentUser: user
        }
      })
      })
    }
  }

  componentWillUnmount() {
    clearTimeout(this._timer);
  }

  handleLogin(user) {
    this.setState({
      auth: {
        currentUser: user
      },
      activeItem: 'user-home'
    }, () => {
      localStorage.setItem('token', user.jwt);
    });
  };

  handleLogout() {
    this.setState({
      activeItem: 'welcome',
      auth: {
        currentUser: {}
      }
    }, () => {
      localStorage.clear()
    })
  }

  goToUserHome() {
    this.setState({
          activeItem: 'user-home'
        })
  }

  handlePageChange(e) {
    this.setState({
      activeItem: e.target.id
    })
  }

  getCurrentGroup(e) {
    this.setState({
      currentGroup: e,
      activeItem: 'group-page'
    })
  }

  renderContent() {
    switch (this.state.activeItem) {
    case 'welcome':
      return <Welcome />;
    case 'login':
      return <LoginForm
        onLogin={this.handleLogin}
        onNavBarClick={this.handlePageChange}
             />;
    case 'signup':
      return <SignupForm
        showWelcome={this.showWelcome}
        onLogin={this.handleLogin}
             />;
    case 'user-home':
      return <UserHome
        user={this.state.auth.currentUser}
        changePage={this.handlePageChange}
        getCurrentGroup={this.getCurrentGroup}
             />;
    case 'sync-games':
      return <SyncGamesPage
        user={this.state.auth.currentUser}
        goHome={this.goToUserHome}
             />;
    case 'group-page':
      return <GroupPage
        user={this.state.auth.currentUser}
        group={this.state.currentGroup}
             />;
    case 'new-event':
      return <NewEventForm
        user={this.state.auth.currentUser}
        goHome={this.goToUserHome}
             />;
    default:
      return <h1>404 404 404 404</h1>
    }
  }

  render() {
    // const loggedIn = !!this.state.auth.currentUser.id;

    return (
      <div className="App">
        <NavBar
          currentUser={this.state.auth.currentUser}
          currentActiveItem={this.state.activeItem}
          onNavBarClick={this.handlePageChange}
          onLogout={this.handleLogout}
        />
        {/* <Switch>
          <Route path="/home" render={(() => {
            return <UserHome user={this.state.auth.currentUser} loggedIn={loggedIn} />
          })} />
          <Route path="/login" render={(() => {
            return <LoginForm onLogin={this.handleLogin} />
          })} />
          <Route path="/signup" render={(() => {
            return <SignupForm
          onLogin={this.handleLogin}
          />
          })} />
          <Route exact path="/" component={Welcome} />
        </Switch> */}
        {this.renderContent()}
        <pre>isLoading: {String(this.state.isLoading)}</pre>
        <LoadingIndicator isLoading={this.state.isLoading}>
          <div>ahoy!</div>
        </LoadingIndicator>
      </div>
    );
  }
}

export default App;
