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

interface Props {

}

export const Quizz = (props: Props) => {
    const user = useSelector((state: State) => state.user);
    const dispatch = useDispatch();

    const [cardsData, setCardsData] = useState<CardData[]>([]);
    const [numberOfQuestionsToPick, setNumberOfQuestionsToPick] = useState<string>("1");
    const [quizzIndex, setQuizzIndex] = useState<number>(0);
    const [showTranslation, setShowTranslation] = useState<boolean>(false);
    const [quizzMode, setQuizzMode] = useState<"random" | "training" | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<{title: string, body: string}>({title: '', body: ''});

    const handleStartRandomQuizz = () => {
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

    const handleStartTrainingQuizz = () => {
        console.log(user.trainingCardsList)
        getAllTrainingCardsOfUser(user.trainingCardsList).then(allTrainingCardsOfUser => {
            console.log("allTrainingCardsOfUser", allTrainingCardsOfUser)
                setQuizzMode("training");
                setCardsData(allTrainingCardsOfUser);
            }).catch(error => {
                console.log('error getAllCardsOfUser Quizz', error);
            })
    };

    const handleNext = () => {
        setShowTranslation(false);
        if (quizzIndex + 1 === cardsData.length) {
            setQuizzIndex(0);
            setCardsData([]);
            setQuizzMode(null)
        } else {
            setQuizzIndex(quizzIndex + 1);
        }
    };

    const handleFailed = () => {
        const updatedTrainingCardsList = [...user.trainingCardsList];
        updatedTrainingCardsList.push(cardsData[quizzIndex].cardUid);
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

    const handleSuccess = () => {
        const trainingCardsList = [...user.trainingCardsList];
        const updatedTrainingCardsList = trainingCardsList.filter(card => card !== cardsData[quizzIndex].cardUid);
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

    return (
        <motion.div
            className={'Component_Quizz'}
        >
            <div className={'Component_Quizz__contentWrapper'}>
                <div className={'Component_Quizz__instruction'}>Quizz</div>
                {quizzMode !== null &&
                <motion.div
                    className={'Component_Quizz__card'}
                >
                    <div className={showTranslation ? 'Component_Quizz__cardContent Component_Quizz__spanish' : 'Component_Quizz__cardContent'}>
                        {!showTranslation && cardsData[quizzIndex]?.nativeLanguageValue}
                        {showTranslation && cardsData[quizzIndex]?.languageToLearnValue}
                    </div>

                </motion.div>
                }
                {quizzMode === null ?
                    <div className={'Component_Quizz__startingForm'}>
                        <div className={'Component_Quizz__subtitle'}>Random quizz</div>
                        <InputCustom label={'Number of questions'} value={numberOfQuestionsToPick} setValue={setNumberOfQuestionsToPick}/>
                        <ButtonCustom color={'yellow'} onClick={handleStartRandomQuizz}>Start random quizz</ButtonCustom>
                        <div className={'Component_Quizz__subtitle'}>Training quizz</div>
                        <ButtonCustom color={'yellow'} onClick={handleStartTrainingQuizz}>Start training quizz</ButtonCustom>
                    </div>
                    : quizzMode === "random" ?
                    <div className={'Component_Quizz__buttonsWrapper'}>
                        <div className={'Component_Quizz__buttonWrapper'}>
                            <ButtonCustom color={'orange'} onClick={() => setShowTranslation(!showTranslation)}>{showTranslation ? "Question" : "Answer"}</ButtonCustom>
                        </div>
                        <div className={'Component_Quizz__buttonWrapper'}>
                            <ButtonCustom color={'yellow'} onClick={handleNext}>Next</ButtonCustom>
                        </div>
                        <div className={'Component_Quizz__buttonWrapper'}>
                            <ButtonCustom color={'yellow'} onClick={handleFailed}>Failed</ButtonCustom>
                        </div>
                    </div>
                        : quizzMode === "training" &&
                    <div className={'Component_Quizz__buttonsWrapper'}>
                        <div className={'Component_Quizz__buttonWrapper'}>
                            <ButtonCustom color={'orange'} onClick={() => setShowTranslation(!showTranslation)}>{showTranslation ? "Question" : "Answer"}</ButtonCustom>
                        </div>
                        <div className={'Component_Quizz__buttonWrapper'}>
                            <ButtonCustom color={'yellow'} onClick={handleNext}>Next</ButtonCustom>
                        </div>
                        <div className={'Component_Quizz__buttonWrapper'}>
                            <ButtonCustom color={'yellow'} onClick={handleSuccess}>Success</ButtonCustom>
                        </div>
                    </div>

                }
                <ModalCustom visible={isModalOpen} setVisible={setIsModalOpen} title={modalContent.title}>
                    {modalContent.body}
                </ModalCustom>
            </div>
        </motion.div>
    );
};
