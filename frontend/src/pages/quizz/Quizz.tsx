import * as React from "react";
import {useState} from "react";
import {useSelector} from "react-redux";
import { motion } from "framer-motion";

import {ButtonCustom} from "../../components/ButtonCustom";
import {InputCustom} from "../../components/InputCustom";
import {ModalCustom} from "../../components/ModalCustom";

import {CardData} from "@Models/types/bases/Form";
import {getAllCardsOfUser} from "@Utils/firebaseConfig";
import {State} from "@Utils/redux/store";
import "./Quizz.scss";

interface Props {

}

export const Quizz = (props: Props) => {
    const user = useSelector((state: State) => state.user);

    const [cardsData, setCardsData] = useState<CardData[]>([]);
    const [numberOfQuestionsToPick, setNumberOfQuestionsToPick] = useState<string>("0");
    const [quizzIndex, setQuizzIndex] = useState<number>(0);
    const [showTranslation, setShowTranslation] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<{title: string, body: string}>({title: '', body: ''});

    const handleStart = () => {
        if (numberOfQuestionsToPick === "0") {
            setIsModalOpen(true);
            setModalContent({title: 'Error', body: 'Please define a number of questions higher than 0.'});
        } else {
            getAllCardsOfUser(user.userUid).then(response => {
                if (Number(numberOfQuestionsToPick) > response.length) {
                    setIsModalOpen(true);
                    setModalContent({title: 'Error', body: `Please choose a number of questions below or equal to ${response.length} (the total number of cards you have created so far).`});
                } else {
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

    const handleNext = () => {
        setShowTranslation(false);
        if (quizzIndex + 1 === cardsData.length) {
            setQuizzIndex(0);
            setCardsData([]);
        } else {
            setQuizzIndex(quizzIndex + 1);
        }

    };

    return (
        <motion.div
            className={'Component_Quizz'}
        >
            <div className={'Component_Quizz__contentWrapper'}>
                <div className={'Component_Quizz__instruction'}>Quizz</div>
                {cardsData.length > 0 &&
                <div className={'Component_Quizz__card'}>

                    <div className={showTranslation ? 'Component_Quizz__cardContent Component_Quizz__spanish' : 'Component_Quizz__cardContent'}>
                        {!showTranslation && cardsData[quizzIndex].nativeLanguageValue}
                        {showTranslation && cardsData[quizzIndex].languageToLearnValue}
                    </div>

                </div>
                }
                {cardsData.length === 0 ?
                    <div className={'Component_Quizz__startingForm'}>
                        <InputCustom label={'Number of questions'} value={numberOfQuestionsToPick} setValue={setNumberOfQuestionsToPick}/>
                        <ButtonCustom color={'yellow'} onClick={handleStart}>Start</ButtonCustom>
                    </div>
                    :
                    <div className={'Component_Quizz__buttonsWrapper'}>
                        <div className={'Component_Quizz__buttonWrapper'}>
                            <ButtonCustom color={'orange'} onClick={() => setShowTranslation(!showTranslation)}>{showTranslation ? "See question" : "See answer"}</ButtonCustom>
                        </div>
                        <div className={'Component_Quizz__buttonWrapper'}>
                            <ButtonCustom color={'yellow'} onClick={handleNext}>Next</ButtonCustom>
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
