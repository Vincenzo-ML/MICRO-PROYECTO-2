import React, { useEffect, useState } from 'react';
import './Clubpage.css';
import Navbar from '../componentes/Navbar';
import { ArrayClubs, ArrayGames } from '../../../firebase';
import { useParams } from 'react-router-dom';
import Club from '../componentes/Club';
import Game from '../componentes/Game.jsx';
import { Link } from 'react-router-dom';
import { ArrayUsers, createUser, checkMembershipByEmail, updateMembershipByEmail, getMembershipsByEmail, findUserByEmail, editUserByEmail, changeUserVideoGameByEmail, addMembershipByEmail, removeMembershipByEmail } from '../../../firebase';
import { auth } from '../../../firebase';
import { onAuthStateChanged } from "firebase/auth";

const Clubpage = () => {
  const reloadPage = () => {
    window.location.reload();
  };

  const [gamesData, setGamesData] = useState([]);
  const [clubsData, setClubsData] = useState([]);
  const [clubnombre, setClubNombre] = useState('');
  const [clubdescripcion, setClubDescripcion] = useState('');
  const [clubid, setClubId] = useState('');
  const [clubjuegos, setClubJuegos] = useState([]);
  const [user, setUser] = useState(null);
  const [userD, setUserData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isMember, setIsMember] = useState(false);
  const [membres, setMembresias] = useState([]);

  const { id } = useParams();

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

  useEffect(() => {
    if (clubsData.length > 0) {
      const idc = Number(id);
      const clubIndex = clubsData.length - idc;

      if (clubIndex >= 0 && clubIndex < clubsData.length) {
        const club = clubsData[clubIndex];

        setClubNombre(club.nombre);
        setClubDescripcion(club.descripcion);
        setClubId(club.ID);
        setClubJuegos(club.videojuegos);
      }
    }
  }, [clubsData, id]);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await findUserByEmail(user.email);
      const mm = await getMembershipsByEmail(user.email);
      setUserData(userData[0]);
      setMembresias(userData.membresias);
      setIsFetching(false);
      console.log(mm);
    };

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        fetchData();
        return;
      }

      setUserData(null);
      setUser(null);
      setIsFetching(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);
        console.log(user);
      } else {
        setUser(null);
        setIsFetching(false);
      }
    });

    const checkMembership = async () => {
      const memberships = await checkMembershipByEmail(user?.email, clubid);
      const isMember = memberships;
      setIsMember(isMember);
    };

    checkMembership();

    return () => {
      unsubscribe();
    };
  }, [clubid, user]);

  if (isFetching) {
    return <h2>Loading...</h2>;
  }

  const filteredGames = gamesData.filter((game) => clubjuegos.includes(Number(game.ID)));

  return (
    <div className="Clubpage">
      <Navbar></Navbar>
      <h1>Bienvenido a la página de inicio!</h1>

      <h1>{clubnombre}</h1>
      <h1>{clubdescripcion}</h1>
      <h1>{clubid}</h1>
      <button
        className={`button ${isMember ? 'red-button' : 'green-button'}`}
        onClick={async () => {
          console.log(isMember);

          const updated = await updateMembershipByEmail(user.email, clubid);
          if (updated) {
            console.log("Membership updated successfully");
          } else {
            console.log("Error updating membership");
          }
          reloadPage();
        }}
      >
        {isMember ? 'Leave Club' : 'Join Club'}
      </button>

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
