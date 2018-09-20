import React, { Component } from 'react';
import { List } from 'semantic-ui-react';

import GameCard from './GameCard';

export default class UserGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
}
    componentDidMount() {
      fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/games`)
        .then(resp => resp.json())
        .then(games => {this.setState({
          games: games.sort(function(a,b){
          return a.name.localeCompare(b.name);
      })
        })
      })
    }



    render() {
      console.log(this.state.games.length);
      return(
        <div className="UserGames container segment ui">
          <h3>You have {this.state.games.length} games</h3>
          <List selection verticalAlign="middle">
            {this.state.games ? this.state.games.map((game) => {
              return <GameCard key={game.bgg_id} game={game} />
            }) : null
            }
          </List>
        </div>
      )
    }
  }
