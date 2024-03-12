import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './componentes/Navbar.jsx';
import Club from './componentes/Club.jsx';
import './Home.css';
import { ArrayClubs } from '../../firebase.js';
import { auth } from '../../firebase.js';
import { onAuthStateChanged } from "firebase/auth";
import { findUserByEmail } from '../../firebase.js';

const Home = () => {
  const [clubsData, setClubsData] = useState([]);
  const [membresias, setMembresias] = useState([]);
  const [user, setUser] = useState(null);
  
  const [isFetching, setIsFetching] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) { 
            const userData = await findUserByEmail(user.email);
            setUserData(userData[0]);
            setIsFetching(false);

            setMembresias(userData[0].membresias)
         
            return;
        }

        setUserData(null);
        setIsFetching(false);
    });
    return () => unsubscribe();
}, []);

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


  const idc = membresias;

    const filteredCLubs = [];

    if (userData !== "") {
        for (let j = 0; j < clubsData.length; j++) {
            for (let i = 0; i < idc.length; i++) {
                if (clubsData[j].ID == idc[i]) {
                    filteredCLubs.push(clubsData[j]);
                   
                }
            }
        }
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
                {filteredCLubs.some((fClub) => fClub.ID === club.ID) ? (
                  <>
                    <Club
                      id={club.ID}
                      name={club.nombre}
                      description={club.descripcion}
                      juegos={club.items}
                    />
                    <p>SUSCRITO</p>
                  </>
                ) : (
                  <Club
                    id={club.ID}
                    name={club.nombre}
                    description={club.descripcion}
                    juegos={club.items}
                  />
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
}

export default Home;
