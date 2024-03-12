import React from 'react'
import './Game.css' // Assuming you have a Game.css file

const Game = ({ id, title, genre, description }) => {
  return (
    <div id={`game-${id}`} className="game">
      <div className="game-content white-text">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="game-info">
        <h3>Género:</h3>
        <p>{genre}</p>
      </div>
    </div>
  )
}

export default Game