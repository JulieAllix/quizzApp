import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {CardData} from "@Models/types/bases/Form";
import {User} from "@Models/types/bases/User";
import {Language} from "@Models/types/bases/Language";

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
const studyCardsRefBis = db.collection('studyCardsBackUp');
const languagesRef = db.collection('languages');

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
    }).then(res => {
        return getUserFirebaseData(userData.userUid)
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
            numberOfCards: firebaseUser.numberOfCards,
            languages: firebaseUser.languages
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

export const createCardBis = async (data: CardData): Promise<void> => {
    return studyCardsRefBis.doc(data.cardUid.toString()).set({
        ...data
    });
};

export const deleteCard = async (data: CardData): Promise<void> => {
    return studyCardsRef.doc(data.cardUid.toString()).delete();
};

export const saveDataBase  = async (data: CardData) => {

    return studyCardsRef.doc(data.cardUid.toString()).set({
        ...data
    });
};

// QUIZZ

export const getRandomCardsOfUser = async (userUid: string, numberOfQuestions: number, languageUid: string): Promise<CardData[]> => {
    const arrayOfRandomUids = [];
    for (let i = 0; i < numberOfQuestions; i++) {
        arrayOfRandomUids.push(getRandomNumberId())
    };
    console.log("here")
    const cardsDataArray = arrayOfRandomUids.map(async (randomUid: string) => {
        const array = (await studyCardsRef.where("userUid", "==", userUid).where("languageUid", "==", languageUid).where("cardUid", ">=", randomUid).orderBy("cardUid").limit(1).get()).docs.map(document => document.data());
        return array[0];
    });

    return Promise.all(cardsDataArray).then(response => {
        const _cardsDataArray = response.map((cardData: CardData) => {
            return {
                userUid: cardData.userUid,
                cardUid: cardData.cardUid,
                nativeLanguageValue: cardData.nativeLanguageValue,
                languageToLearnValue: cardData.languageToLearnValue,
                languageUid: cardData.languageUid
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
            languageUid: cardData.languageUid,
        }
    });
    return _cardsDataArray;
};

export const getAllBackupCardsOfUser = async (userUid: string): Promise<CardData[]> => {
    const cardsDataArray = (await studyCardsRefBis.where("userUid", "==", userUid).get()).docs.map(document => document.data());
    const _cardsDataArray = cardsDataArray.map((cardData: CardData) => {
        return {
            userUid: cardData.userUid,
            cardUid: cardData.cardUid,
            nativeLanguageValue: cardData.nativeLanguageValue,
            languageToLearnValue: cardData.languageToLearnValue,
            languageUid: cardData.languageUid,
        }
    });
    return _cardsDataArray;
};

export const getAllTrainingCardsOfUser = async (trainingCardsList: number[], languageUid: string): Promise<CardData[]> => {

    const cardsDataArray = trainingCardsList.map(async (trainingCardUid: number) => {
        return (await studyCardsRef.doc(trainingCardUid.toString()).get()).data();
    });

    return Promise.all(cardsDataArray).then(response => {
        const _cardsDataArray = response.map((cardData: CardData) => {
            return {
                userUid: cardData.userUid,
                cardUid: cardData.cardUid,
                nativeLanguageValue: cardData.nativeLanguageValue,
                languageToLearnValue: cardData.languageToLearnValue,
                languageUid: cardData.languageUid,
            }
        });
        return _cardsDataArray.filter(card => card.languageUid === languageUid);
    })
};

export const getRandomNumberId = (): number => {
    const array = [];
    for (let i = 0; i < 21; i++) {
        const randomNumber = (Math.random()*10).toString().split('')[0];
        if (randomNumber === '0') {
            array.push('1')
        } else array.push(randomNumber)

    }
    return Number(array.join(''));
}


// LANGUAGE

export const createLanguage = async (languageData: Language): Promise<void> => {
    return languagesRef.doc(languageData.languageUid.toString()).set({
        ...languageData
    });
};

export const getLanguagesOfUser = async (user: User): Promise<Language[]> => {
    const languagesUids = user.languages;
    const languagesArray = (await languagesRef.where("languageUid", "in", languagesUids).get()).docs.map(document => document.data());
    const _languagesDataArray = languagesArray.map((languageData: Language) => {
        return {
            languageUid: languageData.languageUid,
            languageName: languageData.languageName,
        }
    });
    return _languagesDataArray;
};

export const getLanguageByUid = async (languageUid: string): Promise<Language> => {
    const languageData = await languagesRef.doc(languageUid).get();

    const firebaseLanguageData = await languageData.data();
    if (firebaseLanguageData !== undefined) {
        return {
            languageUid: firebaseLanguageData.languageUid,
            languageName: firebaseLanguageData.languageName,
        }
    } else {
        throw new Error();
    }
};
