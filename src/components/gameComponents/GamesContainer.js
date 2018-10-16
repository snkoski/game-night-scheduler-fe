import React, { Component } from 'react';
import GamesList from './GamesList'

export default class GamesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    }
  }


  // componentDidMount() {
  //   fetch(`http://localhost:3000/api/v1/users/${this.props.id}/games`)
  //     .then(resp => resp.json())
  //     .then(games => {this.setState({
  //       games: games.sort(function(a,b){
  //       return a.name.localeCompare(b.name);
  //       })
  //     })
  //   })
  // }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/users/${this.props.id}/games`)
      .then(resp => resp.json())
      .then(games => {this.setState({
        games: games
      })
    })
  }

render() {
  console.log(this.state.games);
  const games = this.state.games.length > 0
  return (
    <div>{games && <GamesList games={this.state.games} />}</div>
  )
}

}
