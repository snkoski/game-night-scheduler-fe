import React, { Component } from 'react';
import GamesList from './GamesList';

class NewGamesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userGames:[]
    }
  }

  componentDidMount() {
this.fetchUserGames()
}

componentDidUpdate(prevProps, prevState) {
  if (this.props !== prevProps) {
    this.fetchUserGames()
  }
}

fetchUserGames = () => {
    fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/games`)
      .then(resp => resp.json())
      .then(userGames => {this.setState({
        userGames: userGames
      })
    })
  }

  render() {
    return (
      <div className="container">
        {/* <SearchBar handleSearch={this.handleSearch} search={this.state.search}/> */}

        {this.state.userGames && <GamesList user={this.props.user}
          // gameSearch={this.state.search}
          games={this.state.userGames}
          // getCurrentGame={this.getCurrentGame}
                                 />}
      </div>
    )
  }
}

export default NewGamesContainer;
