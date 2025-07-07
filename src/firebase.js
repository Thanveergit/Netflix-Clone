// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth"
import {addDoc, collection, getFirestore} from "firebase/firestore"
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEPU0CF_XBV5-zTP92ZMaFCQcJrVQPwg8",
  authDomain: "netflix-clone-e4b23.firebaseapp.com",
  projectId: "netflix-clone-e4b23",
  storageBucket: "netflix-clone-e4b23.firebasestorage.app",
  messagingSenderId: "464210418757",
  appId: "1:464210418757:web:3075a05df6a69c1dbf972c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name,email,password)=>{
     try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user
        await addDoc(collection(db, 'user'),{
          uid:user.uid,
          name,
          authProvider:"local",
          email,
        })
     } catch (error) {
          console.log(error);
          toast.error(error.code.split('/')[1].split('-').join(' '))
     }
}

const login = async (email,password)=>{
     try {
         await signInWithEmailAndPassword(auth,email,password)
     } catch (error) {
          console.log(error)
          toast.error(error.code.split('/')[1].split('-').join(' '))
     }
}

const logout = ()=>{
     signOut(auth)
}

export{auth,db,login,logout,signup};