import React, { Component } from 'react';
import { List } from 'semantic-ui-react';

import GameCard from './GameCard';

export default class UserGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let searched_games = this.props.games.filter((game) => {
      return game.name.toLowerCase().includes(this.props.gameSearch.toLowerCase())
    })
    console.log(this.props.games.length);
    return(
      <div className="UserGames container segment ui">
        <h3>You have {this.props.games.length} games</h3>
        <List selection verticalAlign="middle">
          {this.props.games ? searched_games.map((game) => {
            return <GameCard key={game.bgg_id} game={game} />
          }) : null
          }
        </List>
      </div>
    )
  }
}
