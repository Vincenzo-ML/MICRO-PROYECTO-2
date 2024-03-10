import React, { useEffect, useState } from 'react';
import './Clubpage.css';
import Navbar from '../componentes/Navbar';
import { ArrayClubs } from '../../../firebase';
import { ArrayGames } from '../../../firebase';
import { useParams } from 'react-router-dom';
import Club from '../componentes/Club';
import Game from '../componentes/Game.jsx';
import { Link } from 'react-router-dom';

const Clubpage = () => {
  const [gamesData, setGamesData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await ArrayGames();
      setGamesData(data);
    };
    fetchData();
  }, []);

  const { id } = useParams();

  const [clubsData, setClubsData] = useState([]);
  const [clubnombre, setClubNombre] = useState('');
  const [clubdescripcion, setClubDescripcion] = useState('');
  const [clubid, setClubId] = useState('');
  const [clubjuegos, setClubJuegos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ArrayClubs();
      setClubsData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (clubsData.length > 0) {
      const idc = Number(id);
      const clubIndex = clubsData.length - idc;

      if (clubIndex >= 0 && clubIndex < clubsData.length) {
        const club = clubsData[clubIndex];

        setClubNombre(club.nombre);
        setClubDescripcion(club.descripcion); // Corrected the spelling of 'descripcion'
        setClubId(club.ID);
        setClubJuegos(club.videojuegos);
      }
    }
  }, [clubsData, id]);

  const filteredGames = [];
  for (let i = 0; i < gamesData.length; i++) {
    for (let j = 0; j < clubjuegos.length; j++) {
      if (Number(gamesData[i].ID) === clubjuegos[j]) {
        clubjuegos[j];
        filteredGames.push(gamesData[i]);
        break;
      }
    }
  }

  return (
    <div className="Clubpage">
      <Navbar></Navbar>
      <h1>Bienvenido a la página de inicio!</h1>
      <h1>{clubsData.length > 0 ? clubsData[clubsData.length - Number(id)].nombre : 'Cargando...'}</h1>
      <h1>{clubsData.length > 0 ? clubsData[clubsData.length - Number(id)].descripcion : 'Cargando...'}</h1>
      <h1>{clubsData.length > 0 ? clubsData[clubsData.length - Number(id)].ID : 'Cargando...'}</h1>
      <h1>Juegos:</h1>
      <div className="games-container mt-4">
        {filteredGames.map((game, index) => (
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

export default Clubpage;
