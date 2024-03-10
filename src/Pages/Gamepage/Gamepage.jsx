import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import './Gamepage.css';
import Navbar from '../componentes/Navbar';
import { ArrayGames } from '../../../firebase';


const Gamepage = () => {
  const { id } = useParams();

  const [gamesData, setGamesData] = useState([]);
  const [gameTitle, setGameTitle] = useState('');
  const [gameDescription, setGameDescription] = useState('');
  const [gameGenero, setGameGenero] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ArrayGames();
      setGamesData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (gamesData.length > 0) {
      const idg = Number(id);
      const gameIndex = idg - 1;

      if (gameIndex >= 0 && gameIndex < gamesData.length) {
        const game = gamesData[gameIndex];

        setGameTitle(game.titulo);
        setGameDescription(game.descripcion);
        setGameGenero(game.genero);
      }
    }
  }, [gamesData, id]);

  return (
    <div className="Gamepage">
      <Navbar></Navbar>
      <h1>Welcome to Game Page!</h1>
      <h1>{gameTitle}</h1>
      <h1>{gameDescription}</h1>
      <h1>{gameGenero}</h1>
   
    </div>
  );
}

export default Gamepage;