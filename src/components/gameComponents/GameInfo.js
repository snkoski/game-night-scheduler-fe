import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';

const GameInfo = ({ game }) => (
  <List.Content>
    <p><a target="_blank" href={`https://boardgamegeek.com/boardgame/${game.bgg_id}`}>See game on BGG</a></p>
    <p>Player Count - Min: {game.min_players} Max: {game.max_players}</p>
    <p>Play Time - {game.play_time} minutes</p>
  </List.Content>
)

export default GameInfo;

GameInfo.propTypes = {
  game: PropTypes.object.isRequired
}
