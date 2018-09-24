import React, { Component } from 'react';
import { List } from 'semantic-ui-react';

export default class GameCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      short_description: true
    }
    this.onGameClick = this.onGameClick.bind(this);
    this.renderGameCard = this.renderGameCard.bind(this);
    this.render_description = this.render_description.bind(this);
  }

  onGameClick() {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  render_description() {
    if (this.state.short_description) {
      return (<div>
        {this.props.game.description.substr(0, 200)}...
        {/* <br/> */}
        <a className="game-description" onClick={() => this.setState({short_description: !this.state.short_description})}>Show full description</a>
      </div>)
    }
    return (<div>
      {this.props.game.description}
      <br/>
      <a className="game-description" onClick={() => this.setState({short_description: !this.state.short_description})}>Show less</a>
    </div>)
  }

  renderGameCard() {
    if (this.state.clicked === true) {
    return (<List.Item>
      <List.Content>
        <List.Header onClick={this.onGameClick}>
          {this.props.game.name}
          <br/>
          <img src={this.props.game.thumbnail} />
        </List.Header>
        <p><a target="_blank" href={`https://boardgamegeek.com/boardgame/${this.props.game.bgg_id}`}>See game on BGG</a></p>
        <p>Player Count - Min: {this.props.game.min_players} Max: {this.props.game.max_players}</p>
        <p>Play Time - {this.props.game.play_time} minutes</p>
      </List.Content>
      <br/>
      <List.Content>
        {this.render_description()}
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
