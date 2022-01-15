import * as React from "react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { motion } from "framer-motion";

import {ButtonCustom} from "../../components/ButtonCustom";
import {InputCustom} from "../../components/InputCustom";
import {ModalCustom} from "../../components/ModalCustom";

import {CardData} from "@Models/types/bases/Form";
import {
    getAllTrainingCardsOfUser,
    getRandomCardsOfUser,
    getUserFirebaseData,
    saveUser
} from "@Utils/firebaseConfig";
import {State} from "@Utils/redux/store";
import {setUser} from "@Utils/redux/reducers";
import "./Quizz.scss";
import {Slideshow} from "./Quizz/Slideshow";

interface Props {

}

export const Quizz = (props: Props) => {
    const user = useSelector((state: State) => state.user);
    const dispatch = useDispatch();

    const [cardsData, setCardsData] = useState<CardData[]>([]);
    const [numberOfQuestionsToPick, setNumberOfQuestionsToPick] = useState<string>("1");

    const [quizzMode, setQuizzMode] = useState<"random" | "training" | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<{title: string, body: string}>({title: '', body: ''});

    const handleStartRandomQuizz = (): void => {
        if (numberOfQuestionsToPick === "0") {
            setIsModalOpen(true);
            setModalContent({title: 'Error', body: 'Please define a number of questions higher than 0.'});
        } else {
            getRandomCardsOfUser(user.userUid, Number(numberOfQuestionsToPick)).then(response => {
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
                    } while (randomlySelectedData.length < parseInt(numberOfQuestionsToPick));

                    setCardsData(randomlySelectedData);
                }

            }).catch(error => {
                console.log('error getAllCardsOfUser Quizz', error);
            })
        }
    };

    const handleStartTrainingQuizz = (): void => {
        getAllTrainingCardsOfUser(user.trainingCardsList).then(allTrainingCardsOfUser => {
                setQuizzMode("training");
                setCardsData(allTrainingCardsOfUser);
            }).catch(error => {
                console.log('error getAllCardsOfUser Quizz', error);
            })
    };

    const handleSuccess = (index: number): void => {
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
            })
        }).catch(error => {
            setIsModalOpen(true);
            setModalContent({title: 'Error', body: "This card couldn't get removed from your training cards list."});
            console.log("error saveUser : ", error)
        });
    };

    const handleFailed = (index: number): void => {
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
            })
        }).catch(error => {
            setIsModalOpen(true);
            setModalContent({title: 'Error', body: "This card couldn't be added to your training cards list."});
            console.log("error saveUser : ", error)
        });
    };

    return (
        <motion.div
            className={'Component_Quizz'}
        >
            <div className={'Component_Quizz__contentWrapper'}>
                <div className={'Component_Quizz__instruction'}>{quizzMode === null ? "Choose your quizz mode" : quizzMode === "random" ? "Random quizz" : "Training quizz"}</div>
                {quizzMode !== null &&
                <div className={'Component_Quizz__text'}>{cardsData.length} question{cardsData.length > 1 ? 's': ''}</div>
                }
                {quizzMode !== null &&
                    <Slideshow
                        cardsData={cardsData}
                        quizzMode={quizzMode}
                        setQuizzMode={setQuizzMode}
                        handleSuccess={handleSuccess}
                        handleFailed={handleFailed}
                    />
                }
                {quizzMode === null &&
                    <div className={'Component_Quizz__startingForm'}>
                        <div className={'Component_Quizz__subtitle'}>Random quizz</div>
                        <InputCustom label={'Number of questions'} value={numberOfQuestionsToPick} setValue={setNumberOfQuestionsToPick}/>
                        <ButtonCustom color={'yellow'} onClick={handleStartRandomQuizz}>Start random quizz</ButtonCustom>
                        <div className={'Component_Quizz__subtitle'}>Training quizz</div>
                        <ButtonCustom color={'yellow'} onClick={handleStartTrainingQuizz}>Start training quizz</ButtonCustom>
                    </div>
                }
                <ModalCustom visible={isModalOpen} setVisible={setIsModalOpen} title={modalContent.title}>
                    {modalContent.body}
                </ModalCustom>
            </div>
        </motion.div>
    );
};
{/*
                                <motion.div
                    className={'Component_Quizz__card'}
                >
                    <div className={showTranslation ? 'Component_Quizz__cardContent Component_Quizz__spanish' : 'Component_Quizz__cardContent'}>
                        {!showTranslation && cardsData[quizzIndex]?.nativeLanguageValue}
                        {showTranslation && cardsData[quizzIndex]?.languageToLearnValue}
                    </div>

                </motion.div>
                */}
