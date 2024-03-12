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

    
      function buscarIndicePorId(lista, idComparar) {
        for (let i = 0; i < lista.length; i++) {
          if (lista[i].ID === idComparar) {
            return i;
            
          }
        }
        return -1; 
      }
      

      if (idg >= 0) {
        const game = gamesData[buscarIndicePorId(gamesData, id)];
        
        setGameTitle(game.titulo);
        setGameDescription(game.descripcion);
        setGameGenero(game.genero);
      }
    }
  }, [gamesData, id]);

  return (
    <div className="Gamepage">
      <Navbar></Navbar>
      
      <div className="game-title">{gameTitle}</div>
      <div className="game-description">{gameDescription}</div>
      <div className="game-genre">{gameGenero}</div>
   
    </div>
  );
}

export default Gamepage;