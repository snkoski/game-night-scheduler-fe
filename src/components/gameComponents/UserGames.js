import React, { Component } from 'react';
import { List } from 'semantic-ui-react';

import GameCard from './GameCard';

export default class UserGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.renderGames = this.renderGames.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {

    }
  }

  renderGames() {
    if (Array.isArray(this.props.games)) {
      let searched_games = this.props.games.filter((game) => {
        return game.name.toLowerCase().includes(this.props.gameSearch.toLowerCase())
      })
      return(
        <div className="UserGames container segment ui">
          <h3>You have {this.props.games.length} games</h3>
          <List selection verticalAlign="middle">
            {searched_games.map((game) => {
              return <GameCard key={game.bgg_id} game={game} />
            })}
          </List>
        </div>
      )
    }

    return <h3>Loading Games</h3>
  }

  render() {
    console.log("USER GAMES", this.props);
    return (
      this.renderGames()
    )
  }
}
