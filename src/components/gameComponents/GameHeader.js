import React from 'react';
import PropTypes from 'prop-types';

const GameHeader = ({ game }) => (
  <React.Fragment>
    {game.name}
    <br/>
    <img src={game.thumbnail} alt={`A thumbnail of ${game.name}'s box`}/>
  </React.Fragment>
)

export default GameHeader;

GameHeader.propTypes = {
  game: PropTypes.object.isRequired
}
