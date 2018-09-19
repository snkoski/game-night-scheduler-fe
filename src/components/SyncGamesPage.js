import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';

export default class SyncGamesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.syncGames = this.syncGames.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      username: e.target.value
    })
  }

  syncGames(e) {
    e.preventDefault();
    console.log(this.state.username);
  }
  render() {
    return (
      <div className="SyncGamesPage container">
        <h1>Sync your BGG collection here</h1>
        <Form onSubmit={this.syncGames}>
          <Form.Field>
            <label>BGG username</label>
            <input type="text"
              placeholder="username"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    )
  }
}
