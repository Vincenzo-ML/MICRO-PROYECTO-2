import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home.jsx'
import Gamesearch from './Pages/Gamesearch/Gamesearch.jsx';
import Clubpage from './Pages/Clubpage/Clubpage.jsx';
import Gamepage from './Pages/Gamepage/Gamepage.jsx';
import { auth } from '../firebase.js';
import { onAuthStateChanged } from "firebase/auth";
import { LogReg } from "./Pages/Authentification/LogReg.jsx";

import Perfil from "./Pages/Users/perfil.jsx";
import { Useredit } from "./Pages/Users/usersedit.jsx";
import { NotFoundPage } from "./Pages/404NotFound/404.jsx";


import { PrivateRoute } from "./Pages/Authentification/Rutas/PrivateRoute/PrivateRoute.jsx";
import { PublicRoute } from "./Pages/Authentification/Rutas/PublicRoute/PublicRoute.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
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



  return (
    <>
      <div className="container">
      
        <Routes>
        <Route path="/" element={<PublicRoute><LogReg /></PublicRoute>} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/Juegos" element={<PrivateRoute><Gamesearch /></PrivateRoute>} />
        <Route path="/club/:id" element={<PrivateRoute><Clubpage /></PrivateRoute>} />
        <Route path="/juego/:id" element={<PrivateRoute><Gamepage /></PrivateRoute>} />
        <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
        <Route path="/usedit" element={<PrivateRoute><Useredit /></PrivateRoute>} />
  
        <Route path="*" element={<NotFoundPage />} />
         </Routes>


      </div>
    </>
  )
}

export default App;
