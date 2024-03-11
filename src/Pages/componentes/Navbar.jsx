import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import './Navbar.css'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../../firebase';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [useremail, setUseremail] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUseremail(user.email);
        setIsFetching(false);
        console.log(user); // Print user to console
        return;
      }

      setUser(null);
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="navbar">
      <ul className="navbar-left">
        <li>
          <Link to="/home" className="gameclub-link">
          GAMECLUB
          </Link>
        </li>
        <li>
          <Link to="/Juegos">Juegos</Link>
        </li>
      </ul>
      <ul className="navbar-right">
        <li>
          <Link to="/perfil" className="navbar-right-item">
            <span>{useremail}</span>
            <img src="https://cdn.pixabay.com/photo/2021/07/25/08/03/account-6491185_1280.png" alt="Profile" />
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar