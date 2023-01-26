import * as React from "react";
import {useEffect, useState} from "react";
import {
    useDispatch,
    useSelector
} from "react-redux";
import { motion } from "framer-motion";

import {ButtonCustom} from "../../components/ButtonCustom";
//import {CardGame} from "./Quizz/CardGame";
import {InputNumberCustom} from "../../components/InputNumberCustom";
import {ModalCustom} from "../../components/ModalCustom";
import {Slideshow} from "./Quizz/Slideshow";

import {CardData} from "@Models/types/bases/Form";
import {
    getAllTrainingCardsOfUser, getLanguageByUid,
    getRandomCardsOfUser,
    getUserFirebaseData,
    saveUser
} from "@Utils/firebaseConfig";
import {State} from "@Utils/redux/store";
import {setUser} from "@Utils/redux/reducers";
import "./Quizz.scss";
import {Language} from "@Models/types/bases/Language";



interface Props {

}

export const Quizz = (props: Props) => {
    const user = useSelector((state: State) => state.user);
    const dispatch = useDispatch();

    const [cardsData, setCardsData] = useState<CardData[]>([]);
    const [numberOfQuestionsToPick, setNumberOfQuestionsToPick] = useState<number>(0);
    const [languageToLearnData, setLanguageToLearnData] = useState<Language>(null);

    const [quizzMode, setQuizzMode] = useState<"random" | "training" | null>(null);
    const [isLoading, setIsLoading] = useState<"random" | "training" | "trainingsList" | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<{title: string, body: string}>({title: '', body: ''});

    useEffect(() => {
        getLanguageByUid(user.languageToLearn).then(_language => {
            setLanguageToLearnData(_language);
            console.log("_language", _language)
        }).catch(error => console.error('error getLanguagesOfUser', error));
    }, [user]);

    const handleStartRandomQuizz = (): void => {
        if (numberOfQuestionsToPick === 0) {
            setIsModalOpen(true);
            setModalContent({title: 'Error', body: 'Please define a number of questions higher than 0.'});
        } else {
            setIsLoading("random");
            getRandomCardsOfUser(user.userUid, Number(numberOfQuestionsToPick), languageToLearnData.languageUid).then(response => {
                if (Number(numberOfQuestionsToPick) > response.length) {
                    setIsModalOpen(true);
                    setModalContent({title: 'Error', body: `Please choose a number of questions below or equal to ${response.length} (the total number of cards you have created so far).`});
                } else {
                    setQuizzMode("random");
                    const allData = [...response];
                    const randomlySelectedData = [];
                    const selectedQuestionIndexes: number [] = [];

                    do {
                        // get a random question from theme
                        const questionIndex = Math.floor(allData.length * Math.random())
                        if (!selectedQuestionIndexes.includes(questionIndex)) {
                            randomlySelectedData.push(allData[questionIndex]);
                            selectedQuestionIndexes.push(questionIndex);
                        }
                    } while (randomlySelectedData.length < numberOfQuestionsToPick);
                    setNumberOfQuestionsToPick(0);
                    setCardsData(randomlySelectedData);
                    setIsLoading(null);
                }
            }).catch(error => {
                console.log('error getAllCardsOfUser Quizz', error);
                setIsLoading(null);
            })
        }
    };

    const handleStartTrainingQuizz = (): void => {
        if (user.trainingCardsList.length > 0) {
            setIsLoading("training");
            getAllTrainingCardsOfUser(user.trainingCardsList, languageToLearnData.languageUid).then(allTrainingCardsOfUser => {
                setQuizzMode("training");
                setCardsData(allTrainingCardsOfUser);
                setNumberOfQuestionsToPick(0);
                setIsLoading(null);
            }).catch(error => {
                console.log('error getAllTrainingCardsOfUser Quizz', error);
                setIsLoading(null);
            })
        } else {
            setIsModalOpen(true);
            setModalContent({title: 'Error', body: 'There are no cards in the trainings list at the moment.'});
        };
    };

    //setTimeout(() => handleStartTrainingQuizz(), 100)

    const handleSuccess = (index: number): void => {
        setIsLoading("trainingsList");
        const trainingCardsList = [...user.trainingCardsList];
        const updatedTrainingCardsList = trainingCardsList.filter(card => card !== cardsData[index].cardUid);
        const userData = {
            ...user,
            trainingCardsList: updatedTrainingCardsList
        }
        saveUser(userData).then(() => {
            getUserFirebaseData(user.userUid).then(_user => {
                dispatch(setUser(_user));
                setIsModalOpen(true);
                setModalContent({title: 'Succes', body: "This card got removed from your training cards list !"});
                setIsLoading(null);
            })
        }).catch(error => {
            setIsModalOpen(true);
            setModalContent({title: 'Error', body: "This card couldn't get removed from your training cards list."});
            console.log("error saveUser : ", error);
            setIsLoading(null);
        });
    };

    const handleFailed = (index: number): void => {
        setIsLoading("trainingsList");
        const updatedTrainingCardsList = [...user.trainingCardsList];
        updatedTrainingCardsList.push(cardsData[index].cardUid);
        const userData = {
            ...user,
            trainingCardsList: updatedTrainingCardsList
        }
        saveUser(userData).then(() => {
            getUserFirebaseData(user.userUid).then(_user => {
                dispatch(setUser(_user));
                setIsModalOpen(true);
                setModalContent({title: 'Succes', body: "This card got added to your training cards list !"});
                setIsLoading(null);
            })
        }).catch(error => {
            setIsModalOpen(true);
            setModalContent({title: 'Error', body: "This card couldn't be added to your training cards list."});
            console.log("error saveUser : ", error)
            setIsLoading(null);
        });
    };

    return (
        <motion.div
            className={'Component_Quizz'}
        >
            <div className={'Component_Quizz__contentWrapper'}>
                <div className={'Component_Quizz__instruction'}>{quizzMode === null ? "Quizz mode" : quizzMode === "random" ? "Random quizz" : "Training quizz"}</div>
                <div>
                {quizzMode !== null &&
                    <div className={'Component_Quizz__quizzDetailsWrapper'}>
                        <div className={'Component_Quizz__text'}>{cardsData.length} question{cardsData.length > 1 ? 's': ''}</div>
                        <div className={'Component_Quizz__text'} onClick={() => setQuizzMode(null)}>Stop quizz</div>
                    </div>
                }
                {quizzMode !== null &&

                    <Slideshow
                        cardsData={cardsData}
                        quizzMode={quizzMode}
                        setQuizzMode={setQuizzMode}
                        handleSuccess={handleSuccess}
                        handleFailed={handleFailed}
                        isLoading={isLoading}
                    />
/*
<CardGame />*/
                }
                </div>
                {quizzMode === null &&
                    <div className={'Component_Quizz__cardsWrapper'} style={{height: `${window.innerHeight*0.8}px`, paddingBottom: "20px"}}>
                        <div className={'Component_Quizz__card'}>
                            <div className={'Component_Quizz__cardTitle'}>Random quizz</div>
                            <div className={'Component_Quizz__subtitle'}>Choose the number of questions to pick randomly from your database.</div>
                            <InputNumberCustom label={'Number of questions'} value={numberOfQuestionsToPick} setValue={setNumberOfQuestionsToPick}/>
                            <ButtonCustom onClick={handleStartRandomQuizz} isLoading={isLoading === "random" ? true : false}>Start</ButtonCustom>
                        </div>
                        <div className={'Component_Quizz__card'}>
                            <div className={'Component_Quizz__cardTitle'}>Training quizz</div>
                            <div className={'Component_Quizz__subtitle'}>Work on the vocabulary you have difficulties with.</div>
                            <ButtonCustom onClick={handleStartTrainingQuizz} isLoading={isLoading === "training" ? true : false}>Start</ButtonCustom>
                        </div>
                    </div>
                }

            </div>
            <ModalCustom visible={isModalOpen} setVisible={setIsModalOpen} title={modalContent.title}>
                {modalContent.body}
            </ModalCustom>
        </motion.div>
    );
};
