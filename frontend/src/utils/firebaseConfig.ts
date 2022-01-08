import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {Card} from "@Models/types/bases/Form";

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

export const signOut = (): Promise<void> => {
    return auth.signOut();
}


// FORM

export const createSpanishData = async (itemUid: string, data: any) => {

    return spanishRef.doc(itemUid).set({
        uid: itemUid,
        frenchValue: data.frenchValue,
        spanishValue: data.spanishValue
    });
};

// QUIZZ

export const getAllCards = async (): Promise<Card[]> => {
    const cardsData = await spanishRef.get();
    const cardsDataArray = cardsData.docs.map(document => document.data());

    const _cardsDataArray = cardsDataArray.map(cardData => {
        return {
            uid: cardData.uid,
            frenchValue: cardData.frenchValue,
            spanishValue: cardData.spanishValue
        }
    });
    return _cardsDataArray;
};
