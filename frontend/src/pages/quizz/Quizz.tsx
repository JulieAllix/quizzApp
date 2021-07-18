import * as React from "react";
import {useState} from "react";

import {ButtonCustom} from "../../components/ButtonCustom";

import {Card} from "@Models/types/bases/Form";
import {getAllCards} from "@Utils/firebaseConfig";
import "./Quizz.scss";
import {InputCustom} from "../../components/InputCustom";

interface Props {

}

export const Quizz = (props: Props) => {
    const [cardsData, setCardsData] = useState<Card[]>([]);
    const [numberOfQuestionsToPick, setNumberOfQuestionsToPick] = useState<string>("0");
    const [quizzIndex, setQuizzIndex] = useState<number>(0);
    const [language, setLanguage] = useState<'french' | 'spanish'>('french');

    const handleStart = () => {
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
    };

    const handleNext = () => {
        setLanguage('french');
        if (quizzIndex + 1 === cardsData.length) {
            setQuizzIndex(0);
            setCardsData([]);
        } else {
            setQuizzIndex(quizzIndex + 1);
        }

    };

    return (
        <div className={'Component-Quizz'}>
            {cardsData.length > 0 &&
            <div className={'Component-Quizz__card'}>

                <div className={'Component-Quizz__cardContent'}>
                    {language === 'french' && cardsData[quizzIndex].frenchValue}
                    {language === 'spanish' && cardsData[quizzIndex].spanishValue}
                </div>

            </div>
            }
            {cardsData.length === 0 ?
                <div className={'Component-Quizz__startingForm'}>
                    <InputCustom label={'Nombre de questions'} value={numberOfQuestionsToPick} setValue={setNumberOfQuestionsToPick}/>
                    <ButtonCustom onClick={handleStart}>Commencer</ButtonCustom>
                </div>
                :
                <div className={'Component-Quizz__buttonsWrapper'}>
                    <div className={'Component-Quizz__buttonWrapper'}>
                        <ButtonCustom onClick={() => setLanguage('spanish')}>Voir réponse</ButtonCustom>
                    </div>
                    <div className={'Component-Quizz__buttonWrapper'}>
                        <ButtonCustom onClick={handleNext}>Suivant</ButtonCustom>
                    </div>
                </div>
            }

        </div>
    );
};
