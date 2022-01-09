import * as React from "react";
import {useState} from "react";
import {v4} from "uuid";
import { motion } from "framer-motion";

import {ButtonCustom} from "../../components/ButtonCustom";
import {InputCustom} from "../../components/InputCustom";
import {ModalCustom} from "../../components/ModalCustom";

import {createCard} from "@Utils/firebaseConfig";
import "./Form.scss";
import {useSelector} from "react-redux";
import {State} from "@Utils/redux/store";


interface Props {

}

export const Form = (props: Props) => {
    const user = useSelector((state: State) => state.user);

    const [nativeLanguageValue, setNativeLanguageValue] = useState<string>('');
    const [languageToLearnValue, setLanguageToLearnValue] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<{title: string, body: string}>({title: '', body: ''});

    const handleSend = () => {
        if (nativeLanguageValue === '') {
            setIsModalOpen(true);
            setModalContent({title: 'Error', body: `Please enter the ${user.nativeLanguage} word.`});
        } else if (languageToLearnValue === '') {
            setIsModalOpen(true);
            setModalContent({title: 'Error', body: `Please enter the ${user.languageToLearn} translation.`});
        } else {
            const cardData = {
                userUid: user.userUid,
                cardUid: v4(),
                nativeLanguageValue: nativeLanguageValue,
                languageToLearnValue: languageToLearnValue
            }
            createCard(cardData).then(response => {
                console.log('response createSpanishData', response);
                setIsModalOpen(true);
                setModalContent({title: 'Success', body: 'Your card has been successfully added to the database !'});
                setNativeLanguageValue('');
                setLanguageToLearnValue('');
            }).catch(error => {
                console.log('error createSpanishData', error);
                setIsModalOpen(true);
                setModalContent({title: 'Error', body: "Your card couldn't get added to the database."});
            });
        }
    };

    return (
        <motion.div
            className={'Component_Form'}
        >
            <div className={'Component_Form__contentWrapper'}>
                <div className={'Component_Form__instruction'}>New quizz card</div>
                <InputCustom label={`${user.nativeLanguage} word`} value={nativeLanguageValue} setValue={setNativeLanguageValue}/>
                <InputCustom label={`${user.languageToLearn} translation`} value={languageToLearnValue} setValue={setLanguageToLearnValue}/>
                <ButtonCustom color={'yellow'} onClick={handleSend}>Save</ButtonCustom>
                <ModalCustom visible={isModalOpen} setVisible={setIsModalOpen} title={modalContent.title}>
                    {modalContent.body}
                </ModalCustom>
            </div>
        </motion.div>
    );
};
