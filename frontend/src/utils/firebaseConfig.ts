import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {CardData} from "@Models/types/bases/Form";
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
            trainingCardsList: firebaseUser.trainingCardsList,
            numberOfCards: firebaseUser.numberOfCards
        }
    } else {
        throw new Error();
    }
};


// FORM

export const createCard = async (data: CardData): Promise<void> => {
    return studyCardsRef.doc(data.cardUid.toString()).set({
        ...data
    });
};

export const saveDataBase  = async (data: CardData) => {

    return studyCardsRef.doc(data.cardUid.toString()).set({
        ...data
    });
};

// QUIZZ

export const getRandomCardsOfUser = async (userUid: string, numberOfQuestions: number): Promise<CardData[]> => {
    const arrayOfRandomUids = [];
    for (let i = 0; i < numberOfQuestions; i++) {
        arrayOfRandomUids.push(getRandomNumberId())
    };

    const cardsDataArray = arrayOfRandomUids.map(async (randomUid: string) => {
        const array = (await studyCardsRef.where("userUid", "==", userUid).where("cardUid", ">=", randomUid).orderBy("cardUid").limit(1).get()).docs.map(document => document.data());
        return array[0];
    });

    return Promise.all(cardsDataArray).then(response => {
        const _cardsDataArray = response.map((cardData: CardData) => {
            return {
                userUid: cardData.userUid,
                cardUid: cardData.cardUid,
                nativeLanguageValue: cardData.nativeLanguageValue,
                languageToLearnValue: cardData.languageToLearnValue,
            }
        });
        return _cardsDataArray;
    })

};

export const getAllCardsOfUser = async (userUid: string): Promise<CardData[]> => {
    const cardsDataArray = (await studyCardsRef.where("userUid", "==", userUid).get()).docs.map(document => document.data());
    const _cardsDataArray = cardsDataArray.map((cardData: CardData) => {
        return {
            userUid: cardData.userUid,
            cardUid: cardData.cardUid,
            nativeLanguageValue: cardData.nativeLanguageValue,
            languageToLearnValue: cardData.languageToLearnValue,
        }
    });
    return _cardsDataArray;
};

export const getAllTrainingCardsOfUser = async (trainingCardsList: number[]): Promise<CardData[]> => {
    const cardsDataArray = (await studyCardsRef.where("cardUid", "in", trainingCardsList).get()).docs.map(document => document.data());

    const _cardsDataArray = cardsDataArray.map((cardData: CardData) => {
        return {
            userUid: cardData.userUid,
            cardUid: cardData.cardUid,
            nativeLanguageValue: cardData.nativeLanguageValue,
            languageToLearnValue: cardData.languageToLearnValue,
        }
    });
    return _cardsDataArray;
};

export const getRandomNumberId = (): number => {
    const test = [];
    for (let i = 0; i < 21; i++) {
        test.push((Math.random()*10).toString().split('')[0])
    }
    return Number(test.join(''));
}
