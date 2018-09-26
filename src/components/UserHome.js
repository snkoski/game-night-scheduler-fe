import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import UserGames from './gameComponents/UserGames';
import SearchBar from './SearchBar';

export default class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    this.setState({
      search: e.target.value
    })
  }

  render() {

    return (
      <div className="UserHome container">
        <Grid divided>
          <Grid.Row>
            <Grid.Column width={8}>
              <SearchBar handleSearch={this.handleSearch} search={this.state.search}/>
              <UserGames user={this.props.user} gameSearch={this.state.search}/>
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
