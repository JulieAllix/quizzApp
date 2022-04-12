import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { motion } from "framer-motion";

import {ButtonCustom} from "../../components/ButtonCustom";
import {InputCustom} from "../../components/InputCustom";
import {ModalCustom} from "../../components/ModalCustom";

import {
    createCard,
    getLanguageByUid,
    getRandomNumberId,
    getUserFirebaseData,
    saveUser
} from "@Utils/firebaseConfig";
import {State} from "@Utils/redux/store";
import {Language} from "@Models/types/bases/Language";
import {setUser} from "@Utils/redux/reducers";
import "./Form.scss";

interface Props {

}

export const Form = (props: Props) => {
    const dispatch = useDispatch();
    const user = useSelector((state: State) => state.user);

    const [nativeLanguageValue, setNativeLanguageValue] = useState<string>('');
    const [languageToLearnValue, setLanguageToLearnValue] = useState<string>('');
    const [languageToLearnData, setLanguageToLearnData] = useState<Language>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<{title: string, body: string}>({title: '', body: ''});

    useEffect(() => {
        getLanguageByUid(user.languageToLearn[0]).then(_language => {
            setLanguageToLearnData(_language);
            console.log("_language", _language)
        }).catch(error => console.error('error getLanguagesOfUser', error));
    }, [user]);

    const handleSend = () => {
        if (nativeLanguageValue === '') {
            setIsModalOpen(true);
            setModalContent({title: 'Error', body: `Please enter the ${user.nativeLanguage} word.`});
        } else if (languageToLearnValue === '') {
            setIsModalOpen(true);
            setModalContent({title: 'Error', body: `Please enter the ${user.languageToLearn} translation.`});
        } else {
            setIsLoading(true);
            const cardData = {
                userUid: user.userUid,
                cardUid: getRandomNumberId(),
                nativeLanguageValue: nativeLanguageValue,
                languageToLearnValue: languageToLearnValue,
                languageUid: languageToLearnData ? languageToLearnData.languageUid : "",
            }
            createCard(cardData).then(response => {
                setIsModalOpen(true);
                setModalContent({title: 'Success', body: 'Your card has been successfully added to the database !'});
                setNativeLanguageValue('');
                setLanguageToLearnValue('');

                const updatedTrainingCardsList = [...user.trainingCardsList];
                updatedTrainingCardsList.push(cardData.cardUid);

                const updatedUser = {
                    ...user,
                    numberOfCards: user.numberOfCards + 1,
                    trainingCardsList: updatedTrainingCardsList
                };
                saveUser(updatedUser).then(() => {
                    getUserFirebaseData(user.userUid).then(userData => {
                        dispatch(setUser(userData));
                        setIsLoading(false);
                    }).catch(error => {
                        console.error("error getUserFirebaseData Form", error);
                        setIsLoading(false);
                    })
                }).catch(error => {
                    console.error("error saveUser Form", error);
                    setIsLoading(false);
                });
            }).catch(error => {
                console.log('error createSpanishData', error);
                setIsModalOpen(true);
                setModalContent({title: 'Error', body: "Your card couldn't get added to the database."});
                setIsLoading(false);
            });
        }
    };
//height: `${window.innerHeight*0.8}px`,
    return (
        <motion.div
            className={'Component_Form'}
        >
            <div className={'Component_Form__contentWrapper'}>
                <div className={'Component_Form__instruction'}>New quizz card</div>
                <div className={'Component_Form__cardsWrapper'} style={{paddingBottom: "20px"}}>
                    <div className={'Component_Form__card'}>
                        <div className={'Component_Form__cardTitle'}>{user.nativeLanguage} word</div>
                        <div className={'Component_Form__subtitle'}>Add a word in your mother tongue.</div>
                        <InputCustom value={nativeLanguageValue} setValue={setNativeLanguageValue}/>
                    </div>
                    <div className={'Component_Form__card'}>
                        <div className={'Component_Form__cardTitle'}>{languageToLearnData ? languageToLearnData.languageName : ""} translation</div>
                        <div className={'Component_Form__subtitle'}>Write the translation of the word you added in the language you are learning.</div>
                        <InputCustom value={languageToLearnValue} setValue={setLanguageToLearnValue}/>
                    </div>
                    <ButtonCustom isLoading={isLoading} onClick={handleSend}>Save</ButtonCustom>
                </div>

                <ModalCustom visible={isModalOpen} setVisible={setIsModalOpen} title={modalContent.title}>
                    {modalContent.body}
                </ModalCustom>
            </div>
        </motion.div>
    );
};
