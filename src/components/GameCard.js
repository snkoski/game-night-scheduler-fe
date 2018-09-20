import React, { Component } from 'react';
import { List } from 'semantic-ui-react';

export default class GameCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }
    this.onGameClick = this.onGameClick.bind(this);
    this.renderGameCard = this.renderGameCard.bind(this);
    this.removeUnicode = this.removeUnicode.bind(this);
  }

  onGameClick() {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  removeUnicode(string) {
    string = string.replace(/&#10;/g, " ").replace(/&quot;/g, "\"")
    return string
  }

  renderGameCard() {
    const description = this.removeUnicode(this.props.game.description)
    // debugger
    if (this.state.clicked === true) {
    return (<List.Item onClick={this.onGameClick}>
      <List.Content>
        <List.Header>
          {this.props.game.name}
        </List.Header>
        <img src={this.props.game.thumbnail} />
        <p>Player Count - Min: {this.props.game.min_players} Max: {this.props.game.max_players}</p>
        <p>Play Time - {this.props.game.play_time} minutes</p>
        <p>Description - {description}</p>
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
