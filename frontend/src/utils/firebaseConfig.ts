import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {Card, CardsDataBase} from "@Models/types/bases/Form";
import {User} from "@Models/types/bases/User";

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
const usersRef = db.collection('users');
const studyCardsRef = db.collection('studyCards');

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

export const saveUser = (userData: User) => {
    return usersRef.doc(userData.userUid).set({
        ...userData
    });
};

export const getUserFirebaseData = async (userUid: string): Promise<User> => {
    const userData = await usersRef.doc(userUid).get();

    const firebaseUser = await userData.data();
    if (firebaseUser !== undefined) {
        return {
            userUid: firebaseUser.userUid,
            email: firebaseUser.email,
            nativeLanguage: firebaseUser.nativeLanguage,
            languageToLearn: firebaseUser.languageToLearn,
            studyCardsDataBaseUid: firebaseUser.studyCardsDataBaseUid
        }
    } else {
        throw new Error();
    }
};


// FORM

export const createSpanishData = async (itemUid: string, data: any) => {

    return spanishRef.doc(itemUid).set({
        uid: itemUid,
        frenchValue: data.frenchValue,
        spanishValue: data.spanishValue
    });
};

export const saveDataBase  = async (data: CardsDataBase) => {

    return studyCardsRef.doc(data.dataBaseUid).set({
        ...data
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
