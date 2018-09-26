import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import GameDescription from './GameDescription';
import GameHeader from './GameHeader';
import GameInfo from './GameInfo';

export default class GameCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,

    }
    this.onGameClick = this.onGameClick.bind(this);
  }

  onGameClick() {
    this.setState((prevState, props) => {
      return { clicked: !prevState.clicked }
    })
  }


  renderGameCard() {
    if (this.state.clicked === true) {
    return (
      <List.Item>
        <List.Header onClick={this.onGameClick}>
          <GameHeader game={this.props.game} />
        </List.Header>
        <GameInfo game={this.props.game} />
        <br/>
        <GameDescription description={this.props.game.description} />
      </List.Item>)
    }
  return (
    <List.Item onClick={this.onGameClick}>
      <List.Content>
        <List.Header>
          {this.props.game.name}
        </List.Header>
      </List.Content>
    </List.Item>)
  }

  render() {
    return (
      this.renderGameCard()
    )
  }
}

GameCard.propTypes = {
  game: PropTypes.object.isRequired
}
