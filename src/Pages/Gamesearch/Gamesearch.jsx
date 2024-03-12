import React, { useEffect, useState } from 'react';
import Navbar from '../componentes/Navbar.jsx';
import Game from '../componentes/Game.jsx';
import { Link } from 'react-router-dom';
import './Gamesearch.css';
import { ArrayGames } from '../../../firebase.js';

const Gamesearch = () => {
  const [gamesData, setGamesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ArrayGames();
      setGamesData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery !== '') {
      const filtered = gamesData.filter((game) =>
        game.titulo.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredGames(filtered);
    } else {
      setFilteredGames([]);
    }
  }, [searchQuery, gamesData]);

  const gamesToRender = searchQuery !== '' ? filteredGames : gamesData;

  return (
    <div className="gamesearch">
      <Navbar />
      <h1 className="welcome-text">Buscador de juegos</h1>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Buscar juegos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="games-container mt-4">
        {gamesToRender.length > 0 && (
          gamesToRender.map((game, index) => (
            <Link key={index} to={`/juego/${game.ID}`}>
              <div className="game-link">
                <Game
                  id={game.ID}
                  title={game.titulo}
                  genre={game.genero}
                  description={game.descripcion}
                  textColor="white" // Pasa la prop textColor al componente Game
                />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Gamesearch;
