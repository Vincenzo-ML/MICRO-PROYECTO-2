import React, { useEffect, useState } from 'react';
import Navbar from '../componentes/Navbar.jsx';
import Game from '../componentes/Game.jsx';
import { Link } from 'react-router-dom';
import './Gamesearch.css';
import { ArrayGames } from '../../../firebase.js';


const Gamesearch = () => {
  const [gamesData, setGamesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await ArrayGames();
      setGamesData(data);
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredGames = [];

  if (searchQuery !== "") {
    for (let j = 0; j < gamesData.length; j++) {
      console.log(100)
      if (gamesData[j].titulo.toLowerCase().includes(searchQuery.toLowerCase())) {
        console.log(gamesData[j])
        filteredGames.push(gamesData[j]);
      }
    }
  }
  

  const gamesToRender = filteredGames.length > 0 ? filteredGames : gamesData;

  return (
    <div className="gamesearch">
      <Navbar />
      <h1>Welcome to Gamesearch Page!</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search games..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="games-container mt-4">
        {gamesToRender.map((game, index) => (
          <Link key={index} to={`/juego/${game.ID}`}>
            <div className="game-link">
              <Game
                id={game.ID}
                title={game.titulo}
                genre={game.genero}
                description={game.descripcion}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Gamesearch;
