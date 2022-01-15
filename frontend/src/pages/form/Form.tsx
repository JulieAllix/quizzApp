import * as React from "react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {v4} from "uuid";
import { motion } from "framer-motion";

import {ButtonCustom} from "../../components/ButtonCustom";
import {InputCustom} from "../../components/InputCustom";
import {ModalCustom} from "../../components/ModalCustom";

import {createCard, getUserFirebaseData, saveUser} from "@Utils/firebaseConfig";
import {State} from "@Utils/redux/store";
import {setUser} from "@Utils/redux/reducers";
import "./Form.scss";

interface Props {

}

export const Form = (props: Props) => {
    const dispatch = useDispatch();
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
                setIsModalOpen(true);
                setModalContent({title: 'Success', body: 'Your card has been successfully added to the database !'});
                setNativeLanguageValue('');
                setLanguageToLearnValue('');
                const updatedUser = {
                    ...user,
                    numberOfCards: user.numberOfCards + 1
                };
                saveUser(updatedUser).then(() => {
                    getUserFirebaseData(user.userUid).then(userData => {
                        dispatch(setUser(userData));
                    }).catch(error => console.error("error getUserFirebaseData Form", error))
                }).catch(error => console.error("error saveUser Form", error))
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
