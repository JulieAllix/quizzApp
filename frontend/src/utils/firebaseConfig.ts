import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCpCJHA29oT95x77kPiGklBosw-5Ryneu4",
    authDomain: "quizzapp-cac19.firebaseapp.com",
    projectId: "quizzapp-cac19",
    storageBucket: "quizzapp-cac19.appspot.com",
    messagingSenderId: "730510455052",
    appId: "1:730510455052:web:91b378704b9db857bb9929",
    measurementId: "G-K1F3GC1TST"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
const db = firebase.firestore();

const spanishRef = db.collection('espagnol');

// AUTH

export const registerWithEmailAndPassword = (email:string,password:string) =>{
    return auth.createUserWithEmailAndPassword(email,password);
};

export const loginWithEmailAndPassword = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password)
};


// FORM

export const createSpanishData = async (itemUid: string, data: any) => {

    return spanishRef.doc(itemUid).set({
        uid: itemUid,
        frenchValue: data.frenchValue,
        spanishValue: data.spanishValue
    });
};
