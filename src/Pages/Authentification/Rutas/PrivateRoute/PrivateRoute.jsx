import { Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from 'react';
import { auth } from "../../../../../firebase";

export function PrivateRoute({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        setTimeout(() => {
          // Redirect the user to "/" after 5 seconds
          window.location.href = "/";
        }, 500);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []); // The empty array makes the effect run only once

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return children;
}
