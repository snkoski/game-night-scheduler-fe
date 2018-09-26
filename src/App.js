import React, { Component } from 'react';
import './App.css';

import Welcome from './components/Welcome';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import UserGames from './components/gameComponents/UserGames';
import SignupForm from './components/SignupForm';
import UserHome from './components/UserHome';
import SyncGamesPage from './components/gameComponents/SyncGamesPage';
import LoadingIndicator from './components/LoadingIndicator';

class App extends Component {
constructor(props) {
  super(props);
  this.state = {
    isLoading: true,
    activeItem: 'welcome',
    auth: {
      currentUser: {}
    }
  };
  this.renderContent = this.renderContent.bind(this);
  this.handlePageChange = this.handlePageChange.bind(this);
  this.handleNavBarClick = this.handleNavBarClick.bind(this);
  this.showWelcome = this.showWelcome.bind(this);
  this.handleLogout = this.handleLogout.bind(this);
  this.handleLogin = this.handleLogin.bind(this);

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
      }
      // activeItem: 'welcome'
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

  showWelcome() {
    if(!!this.state.auth.currentUser.id) {
      this.setState({
        activeItem: 'user-home'
      })
    }
  }

  handleNavBarClick(e) {
    this.setState({
      activeItem: e.target.id
    })
  }

  handlePageChange(e) {
    this.setState({
      activeItem: e.target.id
    })
  }

  renderContent() {
    switch (this.state.activeItem) {
    case 'welcome':
      return <Welcome />;
    case 'login':
      return <LoginForm onLogin={this.handleLogin} showWelcome={this.showWelcome} onNavBarClick={this.handleNavBarClick}
             />;
    case 'signup':
      return <SignupForm
        showWelcome={this.showWelcome}
        onLogin={this.handleLogin}
             />;
    case 'user-home':
      return <UserHome user={this.state.auth.currentUser} changePage={this.handlePageChange}/>;
    case 'user-games':
      return <UserGames user={this.state.auth.currentUser} />;
    case 'sync-games':
      return <SyncGamesPage user={this.state.auth.currentUser} showWelcome={this.showWelcome}/>;
    default:
      return <h1>404 404 404 404</h1>
    }
  }

  render() {
    const loggedIn = !!this.state.auth.currentUser.id;

    return (
      <div className="App">
        <NavBar
          currentUser={this.state.auth.currentUser}
          currentActiveItem={this.state.activeItem}
          onNavBarClick={this.handleNavBarClick}
          onLogout={this.handleLogout}
        />
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
