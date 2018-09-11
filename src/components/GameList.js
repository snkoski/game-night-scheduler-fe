import React from 'react';
import GameForm from './GameForm';

class GameList extends React.Component {
state = {
  gameList: []
}
addGameToList = (newGame) => {
  this.setState({
    gameList: [...this.state.gameList, newGame]
  })
}
renderGameList = () => {
  if (this.state.gameList.length === 0) {
    return <ul>...</ul>
  }
  return this.state.gameList.map((game, index) => {
    return <li key={game + index}>{game}</li>
  })
}
  render () {
    return (
      <div>
        <ul>
          {(this.renderGameList())}
        </ul>
        <GameForm addGameToList={this.addGameToList}/>
      </div>
    )
  }
}

export default GameList;
