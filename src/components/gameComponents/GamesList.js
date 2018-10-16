import React from 'react'
import GameCard from './GameCard';

const GamesList = ({games}) => (

  <div><ul>
    {games.map((game) =>
      <li><GameCard game={game} /></li>

    )}
  </ul></div>
)

export default GamesList
