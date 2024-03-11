import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { ArrayGames } from "../../../firebase";
import { ArrayUsers, createUser, findUserByEmail, editUserByEmail, changeUserVideoGameByEmail, addMembershipByEmail, removeMembershipByEmail } from '../../../firebase';
import GoogleButton from 'react-google-button';
import { googleProvider } from "../../../firebase";
import { GoogleAuthProvider } from "firebase/auth";


export const LogReg = ({ user }) => {
  const navigate = useNavigate(); // Add the useNavigate hook

  const [gamesData, setGamesData] = useState([]);
  const [gameTitle, setGameTitle] = useState('');
  const [gameID, setGameID] = useState('');

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [isSignUpActive, setIsSignUpActive] = useState(true);
  const handleMethodChange = () => {
    setIsSignUpActive(!isSignUpActive);
  };

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      console.log(result);
      console.log(result.email);
      navigate("/home"); // Navigate to "/home" after successful sign in with Google
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUpWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      setEmail(result.user.email);
      console.log(email);
  
     
      const x = {
        nombre: 
        "default",
        apellido: "default",
        email: result.user.email,
        username: "default",
        videojuego_preferido: "none",
        membresias: []
      }
      console.log(result.email)
      createUser(x)
      await ArrayUsers();
      navigate("/home"); // Navigate to "/home" after successful sign up with Google
    } catch (error) {
      console.error(error);
    }
  };


  const handleSignUp = async () => {
    if (!email || !password || !name || !lastName || !username) return;

    const x = {
      nombre: name,
      apellido: lastName,
      email: email,
      username: username,
      videojuego_preferido: gameID,
      membresias: []
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      createUser(x)
      await ArrayUsers();
      navigate("/home"); // Redirect to "/home" after successful sign up
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const handleSignIn = () => {
    if (!email || !password) return;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/home"); // Redirect to "/home" after successful sign in
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };



  useEffect(() => {
    const fetchData = async () => {
      const data = await ArrayGames();
      setGamesData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (gamesData.length > 0) {
      const game = gamesData[0];
      setGameTitle(game.titulo);
      setGameID(game.ID);
    }
  }, [gamesData]);

  const gameTitles = gamesData.map((game) => ({ title: game.titulo, id: game.id }));

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);
  const handleLastNameChange = (event) => setLastName(event.target.value);
  const handleUsernameChange = (event) => setUsername(event.target.value);

  if (user) {
    return <Navigate to="/home"></Navigate>;
  }
  return (
    <section>
      <h2>Homepage</h2>
      
      <form>
        {isSignUpActive && <legend>Sign Up</legend>}
        {!isSignUpActive && <legend>Sign In</legend>}

        <fieldset>
          <ul>
            <li>
              <label htmlFor="email">Email</label>
              <input type="text" id="email" onChange={handleEmailChange} />
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={handlePasswordChange}
              />
            </li>
            {isSignUpActive && (
              <>
                <li>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" onChange={handleNameChange} />
                </li>
                <li>
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" id="lastName" onChange={handleLastNameChange} />
                </li>
                <li>
                  <label htmlFor="username">Username</label>
                  <input type="text" id="username" onChange={handleUsernameChange} />
                </li>
                <li>
                  <label htmlFor="gameTitle">Game Title</label>
                  <select value={gameTitle} onChange={(e) => setGameTitle(e.target.value)}>
                    <option value="">Select a game</option>
                    {gameTitles.map((title) => (
                      <option key={title.id} value={title.title}>
                        {title.title}
                      </option>
                    ))}
                  </select>
                </li>
              </>
            )}
          </ul>

          {isSignUpActive && (
            <>
              <button type="button" onClick={handleSignUp}>
                Sign Up
              </button>
              <div>
                <GoogleButton onClick={handleSignUpWithGoogle} />
              </div>
            </>
          )}
          {!isSignUpActive && (
            <>
              <button type="button" onClick={handleSignIn}>
                Sign In
              </button>
              <div>
                <GoogleButton onClick={handleSignUpWithGoogle} />
              </div>
            </>
          )}
        </fieldset>
        {isSignUpActive && <a onClick={handleMethodChange}>Login</a>}
        {!isSignUpActive && (
          <a onClick={handleMethodChange}>Create an account</a>
        )}
      </form>
    </section>
  );
};
