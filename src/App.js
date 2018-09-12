import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GameList from './components/GameList';
import UserList from './components/UserList';

class App extends Component {
  componentDidMount() {
    console.log("App mounted");
  }
  render() {
    return (
      <div className="App">
        <UserList />
      </div>
    );
  }
}

export default App;
