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

  renderGames() {
    if (Array.isArray(this.props.games)) {

      let userGames = this.props.games
      // .sort((a,b) => a.name.localeCompare(b.name))
      // .filter((game) => game.name.toLowerCase().includes(this.props.gameSearch.toLowerCase()))

      return(
        <div className="UserGames container segment ui" onClick={this.props.getCurrentGame}>
          <h3>You have {this.props.games.length} games</h3>
          <List selection verticalAlign="middle">
            {userGames.map((game) => {
              return <div key={game.bgg_id} data-game-id={game.bgg_id}>{game.name}</div>
            })}
          </List>
        </div>
      )
    }

    return <h3>Loading Games</h3>
  }

  render() {
    return (
      this.renderGames()
/* <div>
  {this.props.games && <div className="UserGames container segment ui" >
    <h3>You have {this.props.games.length} games</h3>
    <List selection verticalAlign="middle">
      {this.props.games.map((game) => {
        return <div key={game.bgg_id} data-game-id={game.bgg_id}>{game.name}</div>
      })}
    </List>
  </div>
  }
</div> */

        )
  }
}
