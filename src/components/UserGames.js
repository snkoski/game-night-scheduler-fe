import React, { Component } from 'react';

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
      return(
        <div>
          <ul>
            {this.state.games ? this.state.games.map((game) => {
              return <GameCard key={game.name} game={game} />
            }) :
            <h1>{this.props.user.id}</h1>
            }
          </ul>
        </div>
      )
    }
  }
