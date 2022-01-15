import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { motion } from "framer-motion";

import {ButtonCustom} from "../../components/ButtonCustom";
import {InputCustom} from "../../components/InputCustom";
import {ModalCustom} from "../../components/ModalCustom";

import {setUser} from "@Utils/redux/reducers";
import {saveUser, signOut} from "@Utils/firebaseConfig";
import {State} from "@Utils/redux/store";
import {CardData} from "@Models/types/bases/Form";
import "./Settings.scss";

interface Props {

}

export const Settings = (props: Props) => {
    const user = useSelector((state: State) => state.user);
    const dispatch = useDispatch();

    const [cardsData, setCardsData] = useState<CardData[]>([]);
    const [nativeLanguage, setNativeLanguage] = useState<string>(user.nativeLanguage);
    const [studiedLanguage, setStudiedLanguage] = useState<string>(user.languageToLearn);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<{title: string, body: string}>({title: '', body: ''});

    useEffect(() => {
        setCardsData([]);
    }, []);

    const handleSignOut = (): void => {
        dispatch(setUser(null));
        signOut().catch(error => console.error('error signOut', error));
    };

    const handleSave = (): void => {
        const updatedUser = {
            userUid: user.userUid,
            email: user.email,
            nativeLanguage: nativeLanguage,
            languageToLearn: studiedLanguage,
            trainingCardsList: user.trainingCardsList
        }
        saveUser(updatedUser).then(() => {
            dispatch(setUser(updatedUser));
            setIsModalOpen(true);
            setModalContent({title: 'Success', body: 'The user data got saved.'});
        }).catch(error => {
            console.error('error saveUser Settings', error);
            setIsModalOpen(true);
            setModalContent({title: 'Error', body: "The user data couldn't get saved."});
        });
    };

    return (
        <motion.div
            className={'Component_Settings'}
        >
            <div className={'Component_Settings__contentWrapper'}>
                <div className={'Component_Settings__instruction'}>Settings</div>
                <div className={'Component_Settings__label'}>E-mail address</div>
                <div className={'Component_Settings__text'}>{user.email}</div>
                <div className={'Component_Settings__label'}>Number of cards created</div>
                <div className={'Component_Settings__text'}>{cardsData.length}</div>
                <InputCustom label={'Native language'} value={nativeLanguage} setValue={setNativeLanguage}/>
                <InputCustom label={'Studied language'} value={studiedLanguage} setValue={setStudiedLanguage}/>
                <ButtonCustom color={'yellow'} onClick={handleSave}>Save</ButtonCustom>
                <ButtonCustom color={'orange'} onClick={handleSignOut}>Sign out</ButtonCustom>
            </div>
            <ModalCustom visible={isModalOpen} setVisible={setIsModalOpen} title={modalContent.title}>
                {modalContent.body}
            </ModalCustom>
        </motion.div>
    );
};
