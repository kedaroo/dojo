import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCoETzLW0bPE5nkADuJzuFHHauhNui7Swo",
    authDomain: "thedojosite-3b5cf.firebaseapp.com",
    projectId: "thedojosite-3b5cf",
    storageBucket: "thedojosite-3b5cf.appspot.com",
    messagingSenderId: "542638513729",
    appId: "1:542638513729:web:be7dffaa4d92d0f3ae70c0"
  };

//   init firebase
firebase.initializeApp(firebaseConfig)

// init firestore
const projectFirestore = firebase.firestore()

// init auth
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

// init storage
const projectStorage = firebase.storage()


export { projectFirestore, projectAuth, timestamp, projectStorage }