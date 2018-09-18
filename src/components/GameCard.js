import React, { Component } from 'react';

export default class GameCard extends Component {
  render() {
    return (
      <li>
        <p>{this.props.game.name}</p>
      </li>
    )
  }
}
