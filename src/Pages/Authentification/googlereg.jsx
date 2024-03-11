
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase";
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider } from "firebase/auth";

const Googlereg = () => {
  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      console.log(result);
      console.log(result.email);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(a);
      console.log(result);
      console.log(result.email);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <GoogleButton onClick={handleSignInWithGoogle} />
    </div>
  );
}

export default Googlereg;




