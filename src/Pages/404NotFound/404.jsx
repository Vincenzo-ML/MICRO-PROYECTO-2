import "./404.css"
import React from 'react'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <ul style={{ listStyle: 'none' }}>
      <li>
        <Link to="/" className="not-found-link">
          <h1>404 Not found</h1>
        </Link>
      </li>
    </ul>
  );
}