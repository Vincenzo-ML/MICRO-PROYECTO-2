import React from 'react'
import './Club.css'


const Club = ({ id, name, description, juegos = [] }) => {
  return (
    <div id={`club-${id}`} className="club">
      <div className="club-content">
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
      <div className="club-items">
 
      </div>
      <div className="club-id">
        <p>ID: {id}</p>
      </div>
    </div>
  )
}

export default Club