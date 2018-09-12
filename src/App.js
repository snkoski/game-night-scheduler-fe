import React, { Component } from 'react';
import './App.css';
import UserList from './components/UserList';

class App extends Component {
   state = {
    users: []
  }
  componentDidMount() {
    fetch("http://localhost:3000/api/v1/users")
      .then(resp => resp.json())
      .then(users => { this.setState({
        users
      })
    })
  }
  render() {
    return (
      <div className="App">
        <UserList users={this.state.users}/>
      </div>
    );
  }
}

export default App;
