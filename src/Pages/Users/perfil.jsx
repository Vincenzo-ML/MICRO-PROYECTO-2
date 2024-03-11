import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import Navbar from '../componentes/Navbar';
import { auth } from '../../../firebase';
import { onAuthStateChanged } from "firebase/auth";
import { ArrayUsers, createUser, findUserByEmail, editUserByEmail, changeUserVideoGameByEmail, addMembershipByEmail, removeMembershipByEmail } from '../../../firebase';
import { ArrayGames } from '../../../firebase';
import { ArrayClubs } from '../../../firebase';
import Club from '../componentes/Club';

import Game from '../componentes/Game';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";


const Perfil = () => {

    const [user, setUser] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [userData, setUserData] = useState(null);
    const [gamesData, setGamesData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [clubsData, setClubsData] = useState([]);

    const [userNombre, setuserNombre] = useState([]);
    const [userApellido, setuserApellido] = useState([]);
    const [userEmail, setuserEmail] = useState([]);
    const [username, setusername] = useState([]);
    const [videojuego_pre, setvideojuego_pre] = useState([]);

    
    const [mostrarGamesContainer, setMostrarGamesContainer] = useState(true);
    
    const handleClick = () => {
        history.push('/usedit');
        
      };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) { console.log(user.email)
                const userData = await findUserByEmail(user.email);
                setUser(user);
                setUserData(userData[0]);
                setIsFetching(false);
                console.log(userData[0].nombre); // Imprimir los datos del usuario en la consola
                return;
            }

            setUserData(null);
            setUser(null);
            setIsFetching(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = await ArrayGames();
            setGamesData(data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = await ArrayClubs();
            setClubsData(data);
        };

        fetchData();
    }, []);

    if (isFetching) {
        return <h2>Loading...</h2>;
    }

    const idv = userData.videojuego_preferido;
    const filteredGames = [];

    if (userData !== "") {
        for (let j = 0; j < gamesData.length; j++) {
            if (gamesData[j].ID == idv) {
                filteredGames.push(gamesData[j]);
            }
        }
    }

    const idc = userData.membresias;

    const filteredCLubs = [];

    if (userData !== "") {
        for (let j = 0; j < clubsData.length; j++) {
            for (let i = 0; i < idc.length; i++) {
                if (clubsData[j].ID == idc[i]) {
                    filteredCLubs.push(clubsData[j]);
                    console.log(idc)
                }
            }
        }
    }

    const handleLogout = async () => {
      try {
          
          await signOut(auth);
          
          console.log("Logged out successfully");
          
      } catch (error) {
          console.error(error);
      }
  };

    const gameTitles = gamesData.map((game) => ({ title: game.titulo, id: game.id }));

      

    return (
        <div className="Gamepage">
          <Navbar></Navbar>
          <h1>{user.email}</h1>
          <h1>{userData.nombre}</h1>
          
          <h1>{userData.apellido}</h1>

          <h1>{userData.username}</h1>
          <h1>{}</h1>         <li>
          <Link to="/Usedit">editar perfil</Link>
        </li>
          <h1>Videojuego Preferido</h1> 
          {mostrarGamesContainer ? (
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
          ) : (
            <label>Texto del label</label>
          )}
          clubs de los cuales eres parte
          <div className="clubs-container">
            {filteredCLubs.map((club, index) => (
              <Link key={index} to={`/club/${club.ID}`}>
                <div className="club-link">
                  <Club
                    id={club.ID}
                    name={club.nombre}
                    description={club.descripcion}
                    juegos={club.items}
                  />
                </div>
              </Link>
            ))}
          </div>
          <div><button type="button" onClick={handleLogout}>
                Logout
              </button></div>
        </div>
        
      );
      
}

export default Perfil;
