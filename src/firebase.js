import firebase from 'firebase/app';
// gives us access to the Auth model that holds all the 
// function for signup login reset ...
import 'firebase/auth';

// all our config is a ENV file so we can easily switch
// between development and production
const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
})

// this is the actual function with all the
// reset forgot login sign up ...
export const auth = app.auth()
// If we ever have another section of firebase we want to call other than auth.
// we would call this file then use the app to call the next section.
export default app