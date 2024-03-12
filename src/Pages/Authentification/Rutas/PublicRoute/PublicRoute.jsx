import { Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from 'react';
import { auth } from "../../../../../firebase";

export function PublicRoute({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []); // El array vacío hace que el efecto se ejecute solo una vez

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (user === null) {
    setTimeout(() => {
      return <Navigate to="/" state={{ from: location }} replace />;
    }, 5000); // Redirige al usuario a la ruta "/" después de 5 segundos
  } 

  return children;
}