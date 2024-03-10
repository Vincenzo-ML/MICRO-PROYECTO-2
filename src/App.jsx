import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from './Pages/Home.jsx'
import Gamesearch from './Pages/Gamesearch/Gamesearch.jsx';
import Clubpage from './Pages/Clubpage/Clubpage.jsx';
import Gamepage from './Pages/Gamepage/Gamepage.jsx';
import { NotFoundPage } from './Pages/404NotFound/NotFoundPage.jsx';

function App() {
  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Juegos" element={<Gamesearch />} />
          <Route path="/club/:id" element={<Clubpage />} />
          <Route path="/juego/:id" element={<Gamepage />} />
          <Route path="*" element={<NotFoundPage />} />
          
        </Routes>
      </div>
    </>
  )
}

export default App
