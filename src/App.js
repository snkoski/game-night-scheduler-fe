import React, { Component } from 'react';
import './App.css';

import Welcome from './components/Welcome';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import UserGames from './components/UserGames';
import SignupForm from './components/SignupForm';

class App extends Component {
constructor(props) {
  super(props);
  this.state = {
    activeItem: 'welcome',
    auth: {
      currentUser: {}
    }
  };
}


  componentDidMount() {
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

  handleLogin = (user) => {
    this.setState({
      auth: {
        currentUser: user
      }
      // activeItem: 'welcome'
    }, () => {
      localStorage.setItem('token', user.jwt);
    });
  };

  handleLogout = () => {
    this.setState({
      activeItem: 'welcome',
      auth: {
        currentUser: {}
      }
    }, () => {
      localStorage.clear()
    })
  }

  showWelcome = () => {
    if(!!this.state.auth.currentUser.id) {
      this.setState({
        activeItem: 'user-games'
      })
    }
  }

  handleNavBarClick = (e) => {
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
    case 'user-games':
      return <UserGames user={this.state.auth.currentUser} />;
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

        {/* {loggedIn ?
          (
            <UserGames user={this.state.auth.currentUser} />
          ) :
          (
            <LoginForm onLogin={this.handleLogin} showWelcome={this.showWelcome} works={this.state.works}/>
          )
        } */}
      </div>
    );
  }
}

export default App;
