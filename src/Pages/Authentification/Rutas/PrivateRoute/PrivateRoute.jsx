import { Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from 'react';
import { auth } from "../../../../../firebase";

export function PrivateRoute({ children }) {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  if (user === null) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}