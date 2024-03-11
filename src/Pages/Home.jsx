import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './componentes/Navbar.jsx';
import Club from './componentes/Club.jsx';
import './Home.css';
import { ArrayClubs } from '../../firebase.js';
import { auth } from '../../firebase.js';
import { onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const [clubsData, setClubsData] = useState([]);
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ArrayClubs();
      setClubsData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);
        console.log(user); // Print user to console
        return;
      }

      setUser(null);
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  if (isFetching) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="home">
      <Navbar />
      <div className="welcome">
        <h1>Bienvenido</h1>
      </div>
      <div className="clubs-container">
        {clubsData.map((club, index) => (
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
    </div>
  )
}

export default Home;
