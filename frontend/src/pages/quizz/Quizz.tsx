import * as React from "react";
import {useState} from "react";

import {AppHeader} from "../../components/AppHeader";
import {ButtonCustom} from "../../components/ButtonCustom";
import {InputCustom} from "../../components/InputCustom";
import {ModalCustom} from "../../components/ModalCustom";

import {Card} from "@Models/types/bases/Form";
import {getAllCards} from "@Utils/firebaseConfig";
import "./Quizz.scss";

interface Props {

}

export const Quizz = (props: Props) => {
    const [cardsData, setCardsData] = useState<Card[]>([]);
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
            getAllCards().then(response => {
                console.log('response getAllCards', response);
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
            }).catch(error => {
                console.log('error getAllCards', error);
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
        <div className={'Component_Quizz'}>
            <AppHeader />
            <div className={'Component_Quizz__contentWrapper'}>
                {cardsData.length > 0 &&
                <div className={'Component_Quizz__card'}>

                    <div className={showTranslation ? 'Component_Quizz__cardContent Component_Quizz__spanish' : 'Component_Quizz__cardContent'}>
                        {!showTranslation && cardsData[quizzIndex].frenchValue}
                        {showTranslation && cardsData[quizzIndex].spanishValue}
                    </div>

                </div>
                }
                {cardsData.length === 0 ?
                    <div className={'Component_Quizz__startingForm'}>
                        <InputCustom label={'Number of questions'} value={numberOfQuestionsToPick} setValue={setNumberOfQuestionsToPick}/>
                        <ButtonCustom color={'green'} onClick={handleStart}>Start</ButtonCustom>
                    </div>
                    :
                    <div className={'Component_Quizz__buttonsWrapper'}>
                        <div className={'Component_Quizz__buttonWrapper'}>
                            <ButtonCustom color={'yellow'} onClick={() => setShowTranslation(!showTranslation)}>{showTranslation ? "See question" : "See answer"}</ButtonCustom>
                        </div>
                        <div className={'Component_Quizz__buttonWrapper'}>
                            <ButtonCustom color={'green'} onClick={handleNext}>Next</ButtonCustom>
                        </div>
                    </div>
                }
                <ModalCustom visible={isModalOpen} setVisible={setIsModalOpen} title={modalContent.title}>
                    {modalContent.body}
                </ModalCustom>
            </div>
        </div>
    );
};
