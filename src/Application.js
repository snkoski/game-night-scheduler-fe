import React, { Component } from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';

import NavBar from './components/NavBar';
import Welcome from './components/Welcome';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import UserHome from './components/UserHome';

import PrivateRoute from './components/PrivateRoute';
import AddPropsToRoute from './components/AddPropsToRoute';

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {
        currentUser: {}
      }
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    console.log("APPlication DID MOUNT");

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

  handleLogin(user) {
    this.setState({
      auth: {
        currentUser: user
      },
    }, () => {
      localStorage.setItem('token', user.jwt);
    });
  };

  handleLogout() {
    this.setState({
      auth: {
        currentUser: {}
      }
    }, () => {
      localStorage.clear()
    });
  };

  render() {

    const loggedIn = !!this.state.auth.currentUser.id;

    return (
      <div className="App">
        {<NavBar
          currentUser={this.state.auth.currentUser}
          onLogout={this.handleLogout}
         />}
        <Switch>

          <PrivateRoute path="/welcome" loggedIn={loggedIn} component={Welcome} />

          <Route path="/login" render={(() => {
            return <LoginForm
              onLogin={this.handleLogin}
                   />
          })} />

          <Route path="/signup" loggedIn={loggedIn} component={AddPropsToRoute(SignupForm, {onLogin: this.handleLogin, test: "Hello"})} />

          <Route path="/home" loggedIn={loggedIn} component={AddPropsToRoute(UserHome, {user: this.state.auth.currentUser})} />
        </Switch>
      </div>
    );
  }
}

export default Application;
// return <UserHome
  //     user={this.state.auth.currentUser}
  //     changePage={this.handlePageChange}
  //     getCurrentGroup={this.getCurrentGroup}
  //     userGames={this.state.userGames}
  //          />
