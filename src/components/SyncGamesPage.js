import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';

export default class SyncGamesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgg_username: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.syncGames = this.syncGames.bind(this);
  }



  handleInputChange(e) {
    this.setState({
      bgg_username: e.target.value
    })
  }

  syncGames(e) {
    e.preventDefault();
    console.log(this.state.bgg_username);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(this.state)
    }
    fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/sync`, options)
      .then(resp => resp.json())
      .then(console.log)
      // If login works do this
  }
  render() {
    return (
      <div className="SyncGamesPage container">
        <h1>Sync your BGG collection here</h1>
        <Form onSubmit={this.syncGames}>
          <Form.Field>
            <label>BGG username</label>
            <input type="text"
              placeholder="bgg username"
              name="bgg_username"
              value={this.state.bgg_username}
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    )
  }
}
