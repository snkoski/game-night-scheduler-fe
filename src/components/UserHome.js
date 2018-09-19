import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import UserGames from './UserGames';

export default class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {

    return (
      <div className="UserHome container">
        <Grid divided>
          <Grid.Row>
            <Grid.Column width={8}>
              <UserGames user={this.props.user}/>
            </Grid.Column>
            <Grid.Column width={4}>
              Your Game Groups
            </Grid.Column>
            <Grid.Column wirdth={4}>
              Your Upcoming Game Nights
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </div>
    )
  }
}
