import React, { Component } from 'react';
import GameCard from './GameCard';
import GamesList from './GamesList';
import { Grid } from 'semantic-ui-react';
import SearchBar from '../SearchBar';

class UserGames extends Component {
  constructor(props) {
    super(props);
    this.state={
      search: '',
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.getCurrentGame = this.getCurrentGame.bind(this);
  }

  handleSearch(e) {
    this.setState({
      search: e.target.value
    })
  }

  getCurrentGame(e) {
    console.log("GAME CLICK", e.target.id);
    let currentGame = this.props.userGames.find((game) => {
      return game.bgg_id === e.target.dataset.gameId
    })
    this.setState({
      currentGame: currentGame
    })
  }

  render() {
    return (
<Grid divided>
  <Grid.Row>
    <Grid.Column width={8}>
      <SearchBar handleSearch={this.handleSearch} search={this.state.search}/>

      {this.props.userGames && <GamesList user={this.props.user}
        gameSearch={this.state.search}
        games={this.props.userGames}
        getCurrentGame={this.getCurrentGame}
                               />}
    </Grid.Column>
    <Grid.Column width={8}>
      Game
      {this.state.currentGame && <GameCard key={this.state.currentGame.bgg_id} game={this.state.currentGame} />}
    </Grid.Column>
  </Grid.Row>
</Grid>)
  }
}

export default UserGames
