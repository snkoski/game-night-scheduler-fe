import React, { Component } from 'react';
import GamesList from './GamesList'

export default class GamesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/users/${this.props.id}/games`)
      .then(resp => resp.json())
      .then(games => {this.setState({
        games: games
      })
    })
  }

  render() {
    return (
      <div>{this.state.games && <GamesList games={this.state.games} />}</div>
    )
  }

}
