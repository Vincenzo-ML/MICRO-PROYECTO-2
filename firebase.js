// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
//Import para Firestore:
import { collection, getDocs, addDoc, updateDoc, query,where} from "firebase/firestore";
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
export const storage = getStorage(app);

export const googleProvider = new GoogleAuthProvider();



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
  

export async function ArrayUsers() {
  let usersData = [];
  
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        usersData.push({
          nombre: doc.data().nombre,
          apellido: doc.data().apellido,
          email: doc.data().email,
          username: doc.data().username,
          videojuego_preferido: doc.data().videojuego_preferido,
          membresias: doc.data().membresias,
        });
      });
    } catch (error) {
      console.log("Error getting documents: ", error);
    }
    console.log(usersData);
    return usersData; 
  }



  export async function createUser(userD) {
    try {
      // Check if a user with the same email already exists
      const querySnapshot = await getDocs(query(collection(db, "users"), where("email", "==", userD.email)));
      if (!querySnapshot.empty) {
        console.log("User with the same email already exists");
        return null;
      }
  
      // Create the user
      const docRef = await addDoc(collection(db, "users"), userD);
      return docRef.id;
    } catch (error) {
      console.log("Error creating user: ", error);
      return null;
    }
  }
  
  
  


export async function findUserByEmail(email) {
  try {
    const usersData = await ArrayUsers();
    const userData = usersData.filter((user) => user.email === email);
    console.log(userData);
    return userData;
    
  } catch (error) {
    console.log("Error finding user: ", error);
    return [];
  }
}



export async function editUserByEmail(email, newData) {
  try {
    const usersRef = collection(db, "users");
    const userDoc = await getDocs(query(usersRef, where("email", "==", email)));
    if (!userDoc.empty) {
      const docRef = userDoc.docs[0].ref;
      const updatedData = {
        nombre: newData.nombre || docRef.data().nombre,
        apellido: newData.apellido,
        videojuego_preferido: newData.videojuego_preferido,
        username: newData.username,
      };
      await updateDoc(docRef, updatedData);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error editing user: ", error);
    return false;
  }
}
  
  
  

  export async function changeUserVideoGameByEmail(email, newVideoGame) {
    try {
      // Buscar al usuario por correo electrónico
      const user = await findUserByEmail(email);
      if (!user) {
        return false; // Si no se encuentra al usuario, retornar falso
      }
  
      // Actualizar el videojuego preferido del usuario
      const newData = { videojuego_preferido: newVideoGame };
      const success = await editUserByEmail(email, newData);
      return success;
    } catch (error) {
      console.log("Error changing user's video game: ", error);
      return false;
    }
  }
  

  export async function addMembershipByEmail(email, membership) {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const doc = querySnapshot.docs.find((doc) => doc.data().email === email);
      if (doc) {
        const currentMemberships = doc.data().membresias || [];
        const updatedMemberships = [...currentMemberships, membership];
        await updateDoc(doc.ref, { membresias: updatedMemberships });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Error adding membership: ", error);
      return false;
    }
  }
  
  export async function removeMembershipByEmail(email, membership) {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const doc = querySnapshot.docs.find((doc) => doc.data().email === email);
      if (doc) {
        const currentMemberships = doc.data().membresias || [];
        const updatedMemberships = currentMemberships.filter((m) => m !== membership);
        await updateDoc(doc.ref, { membresias: updatedMemberships });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Error removing membership: ", error);
      return false;
    }
  }

  export async function getMembershipsByEmail(email) {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const doc = querySnapshot.docs.find((doc) => doc.data().email === email);
      if (doc) {
        const memberships = doc.data().membresias || [];
        console.log(memberships)
        return memberships;
      } else {
        return [];
      }
    } catch (error) {
      console.log("Error getting memberships: ", error);
      return [];
    }
  }

  export async function checkMembershipByEmail(email, membership) {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("email", "==", email))
      );
      const doc = querySnapshot.docs[0];
      if (doc) {
        const memberships = doc.data().membresias || [];
        let exists = false;
        for (let i = 0; i < memberships.length; i++) {
          if (memberships[i] === membership) {
            exists = true;
            break;
          }
        }
        console.log(exists);
        return exists;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Error checking membership: ", error);
      return false;
    }
  }
  
  

  export async function updateMembershipByEmail(email, membership) {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const doc = querySnapshot.docs.find((doc) => doc.data().email === email);
      if (doc) {
        const currentMemberships = doc.data().membresias || [];
        const exists = currentMemberships.includes(membership);
        if (exists) {
          const updatedMemberships = currentMemberships.filter((m) => m !== membership);
          await updateDoc(doc.ref, { membresias: updatedMemberships });
          return false; // Membership removed
        } else {
          const updatedMemberships = [...currentMemberships, membership];
          await updateDoc(doc.ref, { membresias: updatedMemberships });
          return true; // Membership added
        }
      } else {
        return false; // User not found
      }
    } catch (error) {
      console.log("Error updating membership: ", error);
      return false;
    }
  }
  