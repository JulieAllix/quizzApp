import * as React from "react";
import {useState} from "react";

import {ButtonCustom} from "../../components/ButtonCustom";

import {Card} from "@Models/types/bases/Form";
import {getAllCards} from "@Utils/firebaseConfig";
import "./Quizz.scss";

interface Props {

}

export const Quizz = (props: Props) => {
    const [cardsData, setCardsData] = useState<Card[]>([]);
    const [quizzIndex, setQuizzIndex] = useState<number>(0);
    const [language, setLanguage] = useState<'french' | 'spanish'>('french');

    const handleStart = () => {
        getAllCards().then(response => {
            console.log('response getAllCards', response);
            setCardsData(response);
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
            <div className={'Component-Quizz__card'}>
                {cardsData.length > 0 &&
                    <div className={'Component-Quizz__cardContent'}>
                        {language === 'french' && cardsData[quizzIndex].frenchValue}
                        {language === 'spanish' && cardsData[quizzIndex].spanishValue}
                    </div>
                }
            </div>
            {cardsData.length === 0 ?
                <ButtonCustom onClick={handleStart}>Commencer</ButtonCustom>
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
