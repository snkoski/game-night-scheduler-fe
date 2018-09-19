import React, { Component } from 'react';
import { List } from 'semantic-ui-react';

export default class GameCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }
    this.onGameClick = this.onGameClick.bind(this);
    this.renderGameCard = this.renderGameCard.bind(this)
  }

  onGameClick() {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  renderGameCard() {
    if (this.state.clicked === true) {
    return (<List.Item onClick={this.onGameClick}>
      <List.Content>
        <List.Header>
          {this.props.game.name}
        </List.Header>
        <p>Min Players: {this.props.game.min_players}</p>
        <p>Max Players: {this.props.game.max_players}</p>
      </List.Content>
    </List.Item>)
    }
  return (<List.Item onClick={this.onGameClick}>
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
