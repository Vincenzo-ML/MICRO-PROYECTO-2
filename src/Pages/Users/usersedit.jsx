import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { ArrayGames } from "../../../firebase";
import { ArrayUsers, createUser, findUserByEmail, editUserByEmail, changeUserVideoGameByEmail, addMembershipByEmail, removeMembershipByEmail } from '../../../firebase';
import Navbar from "../componentes/Navbar";
import { onAuthStateChanged } from "firebase/auth";

export const Useredit = () => {
  const [correo, setCorreo] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [userData, setUserData] = useState(null);
  const [videojuego_pre, setvideojuego_pre] = useState([]);
  
  const [gamesData, setGamesData] = useState([]);
  const [gameTitle, setGameTitle] = useState('');
  const [gameID, setGameID] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await findUserByEmail(user.email);
        setUser(user);
        setUserData(userData[0]);
        setCorreo(user.email);
        setIsFetching(false);
        console.log(user.email); // Print user data to the console
        return;
      }

      setUserData(null);
      setUser(null);
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ArrayGames();
      setGamesData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (gamesData.length > 0) {
      for (let i = 0; i < gamesData.length; i++) {
        const game = gamesData[i];
        setGameTitle(game.titulo);
        setGameID(game.ID);
      }
    }
  }, [gamesData]);

  const gameTitles = gamesData.map((game) => ({ title: game.titulo, id: game.ID }));

  const handleNameChange = (event) => setName(event.target.value);
  const handleLastNameChange = (event) => setLastName(event.target.value);
  const handleUsernameChange = (event) => setUsername(event.target.value);


  const handleSave = () => {
    // Set default values for nombre, apellido, and videojuego_preferido if they are undefined
    const nombre = name || userData.nombre;
    const apellido = lastName || userData.apellido;
    const userN = username || userData.username;
    const videojuego_preferido = gameID || userData.videojuego_preferido;
  
    // Check if gameID is defined
    if (gameID !== undefined) {
      // Find the game with the selected title and set the gameID variable to its ID
      const selectedGame = gamesData.find((game) => game.titulo === gameTitle);
      if (selectedGame) {
        setGameID(selectedGame.ID);
        // Call the editUserByEmail function with the updated data
        editUserByEmail(correo, { nombre, apellido, videojuego_preferido: selectedGame.ID, username: userN })
          .then(() => {
            console.log("User data updated successfully");
            navigate("/perfil"); // Navigate to the home page after saving
          })
          .catch((error) => {
            console.error("Error updating user data:", error);
          });
      } else {
        console.error("Error: selected game not found");
      }
    } else {
      console.error("Error: gameID is undefined");
    }
  };
  
  
  return (
    <section>
      <Navbar></Navbar>
      <h2>Editar datos</h2>
      <ul>
      <li>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" value={username} onChange={handleUsernameChange} />
      </li>
        <li>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} />
        </li>
        <li>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" value={lastName} onChange={handleLastNameChange} />
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
          <button onClick={handleSave} disabled={!name || !lastName || !gameID || !username}>Save</button>
        </li>
      </ul>
    </section>
  );}