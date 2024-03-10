// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//Import para Firestore:
import { collection, getDocs } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMRLu4HPBzz5y9EvYkGsEYDyB4h-Eh4Rs",
  authDomain: "micropr2-61b38.firebaseapp.com",
  projectId: "micropr2-61b38",
  storageBucket: "micropr2-61b38.appspot.com",
  messagingSenderId: "850296971765",
  appId: "1:850296971765:web:3682a1da6c8196e0dbc0bc",
  measurementId: "G-YSFQEHYT5S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });


export async function ArrayClubs() {
    let clubsData = [];
  
    try {
      const querySnapshot = await getDocs(collection(db, "Clubs"));
      querySnapshot.forEach((doc) => {
        clubsData.push({
          ID: doc.data().ID,
          videojuegos: doc.data().videojuegos.map((id) => parseInt(id)),
          descripcion: doc.data().descripcion,
          nombre: doc.data().nombre,
        });
      });
    } catch (error) {
      console.log("Error getting documents: ", error);
    }
  
    return clubsData; 
  }

  export async function ArrayGames() {
    let gamesData = [];
  
    try {
      const querySnapshot = await getDocs(collection(db, "Juegos"));
      querySnapshot.forEach((doc) => {
        gamesData.push({
          ID: doc.data().ID,
          titulo: doc.data().titulo,
          genero: doc.data().genero,
          descripcion: doc.data().descripcion,
        });
      });
    } catch (error) {
      console.log("Error getting documents: ", error);
    }
  
    return gamesData; 
  }
  

  ArrayClubs().then((clubs) => {
    console.log(clubs);
  });
