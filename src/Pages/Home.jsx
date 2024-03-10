import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './componentes/Navbar.jsx';
import Club from './componentes/Club.jsx';
import './Home.css';
import { ArrayClubs } from '../../firebase.js';

const Home = () => {
  const [clubsData, setClubsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ArrayClubs();
      setClubsData(data);
    };

    fetchData();
  }, []);

  const handleClubClick = (id, name, description, juegos) => {
    // do something when a club is clicked
  }

  return (
    <div className="home">
      <Navbar />
      <h1>Welcome to  Home Page!</h1>
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