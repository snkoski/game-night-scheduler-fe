import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';

import Welcome from './components/Welcome';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import SignupForm from './components/SignupForm';
import UserHome from './components/UserHome';
import SyncGamesPage from './components/gameComponents/SyncGamesPage';
import LoadingIndicator from './components/LoadingIndicator';
import GroupPage from './components/groupComponents/GroupPage';
import NewEventForm from './components/eventComponents/NewEventForm';
import AddGamesToVote from './components/voteComponents/AddGamesToVote';
// import ProtectedRoute from './components/ProtectedRoute';
import VotePage from './components/voteComponents/VotePage';


class App extends Component {
constructor(props) {
  super(props);
  this.state = {
    redirect: false,
    isLoading: true,
    userGames: [],
    currentGroup: {},
    currentEvent: {},
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
  this.makeNewEvent = this.makeNewEvent.bind(this);
}

  componentDidMount() {
    console.log("APP DID MOUNT");
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
      fetch(`http://localhost:3000/api/v1/users/${user.id}/games`)
        .then(resp => resp.json())
        .then(games => {this.setState({
          userGames: games.sort(function(a,b){
          return a.name.localeCompare(b.name);
      })
        })
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
      activeItem: 'user-home',
      redirect: true
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

  makeNewEvent() {
    this.setState({
      activeItem: 'new-event'
    })
  }

  // getCurrentEvent

  renderContent() {
    switch (this.state.activeItem) {
    case 'welcome':
      return <Welcome />;
    // case 'login':
    //   return <LoginForm
    //     onLogin={this.handleLogin}
    //     onNavBarClick={this.handlePageChange}
    //          />;
    // case 'signup':
    //   return <SignupForm
    //     showWelcome={this.showWelcome}
    //     onLogin={this.handleLogin}
    //          />;
    // case 'user-home':
    //   return <UserHome
    //     user={this.state.auth.currentUser}
    //     changePage={this.handlePageChange}
    //     getCurrentGroup={this.getCurrentGroup}
    //     userGames={this.state.userGames}
    //          />;
    case 'sync-games':
      return <SyncGamesPage
        user={this.state.auth.currentUser}
        goHome={this.goToUserHome}
             />;
    case 'group-page':
    console.log("CURRENT GAMES: ", this.state.userGames);
      return <GroupPage
        user={this.state.auth.currentUser}
        group={this.state.currentGroup}
        newEvent={this.makeNewEvent}

             />;
    case 'new-event':
      return <NewEventForm
        user={this.state.auth.currentUser}
        goHome={this.goToUserHome}
        group={this.state.currentGroup}
             />;
    case 'add-games-to-vote':
      return <AddGamesToVote
        user={this.state.auth.currentUser}
        event={this.state.currentEvent}
        games={this.state.userGames}
             />
    default:
      return <h1>404 404 404 404</h1>
    }
  }

  render() {
    const loggedIn = !!this.state.auth.currentUser.id;
    // console.log("LOGGED IN", loggedIn);
    // console.log(this.state.userGames);
    return (
      <div className="App">
        <NavBar
          currentUser={this.state.auth.currentUser}
          currentActiveItem={this.state.activeItem}
          onNavBarClick={this.handlePageChange}
          onLogout={this.handleLogout}
        />
        { <Switch>
          {/* <ProtectedRoute path="/welcome" loggedIn={loggedIn} component={Welcome} />
            <ProtectedRoute path="/home" loggedIn={loggedIn} render={(() => {
            return <UserHome
              user={this.state.auth.currentUser}
              changePage={this.handlePageChange}
              getCurrentGroup={this.getCurrentGroup}
              userGames={this.state.userGames}
            />


          })} /> */}
          <Route path="/welcome" component={Welcome} />

            <Route path="/home" render={(() => {
              return <UserHome
                user={this.state.auth.currentUser}
                changePage={this.handlePageChange}
                getCurrentGroup={this.getCurrentGroup}
                userGames={this.state.userGames}
                     />


            })} />
          <Route path="/login" render={(() => {
            return <LoginForm
              onLogin={this.handleLogin}
              onNavBarClick={this.handlePageChange}
              redirect={this.state.redirect}
                   />
          })} />
          <Route path="/signup" render={(() => {
            return <SignupForm
              showWelcome={this.showWelcome}
              onLogin={this.handleLogin}
                   />
          })} />
          <Route path="/new_event" render={(() => {
            return <NewEventForm
              user={this.state.auth.currentUser}
              group={this.state.currentGroup}
                   />
          })} />
          {/* <Route path="/add" render={(() => {
              return <VotePage
              // user={this.props.user}
              // event={this.props.event}
              // games={this.state.userGames}
              />
            })} /> */}
          <Route exact path="/" component={Welcome} />
        </Switch> }
        {/* {loggedIn ? this.renderContent() : <LoginForm
          onLogin={this.handleLogin}
          onNavBarClick={this.handlePageChange}
        />} */}
        <pre>isLoading: {String(this.state.isLoading)}</pre>
        <LoadingIndicator isLoading={this.state.isLoading}>
          <div>{this.state.auth.currentUser.id}</div>
        </LoadingIndicator>
      </div>
    );
  }
}

export default App;
