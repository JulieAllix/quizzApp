import * as React from "react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { motion } from "framer-motion";

import {ButtonCustom} from "../../components/ButtonCustom";
import {InputCustom} from "../../components/InputCustom";
import {ModalCustom} from "../../components/ModalCustom";

import {setUser} from "@Utils/redux/reducers";
import {
    saveUser,
    signOut
} from "@Utils/firebaseConfig";
import {State} from "@Utils/redux/store";
import "./Settings.scss";

interface Props {

}

export const Settings = (props: Props) => {
    const user = useSelector((state: State) => state.user);
    const dispatch = useDispatch();

    const [nativeLanguage, setNativeLanguage] = useState<string>(user.nativeLanguage);
    const [studiedLanguage, setStudiedLanguage] = useState<string>(user.languageToLearn);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<{title: string, body: string}>({title: '', body: ''});

    const handleSignOut = (): void => {
        dispatch(setUser(null));
        signOut().catch(error => console.error('error signOut', error));
    };

    const handleSave = (): void => {
        setIsLoading(true);
        const updatedUser = {
            userUid: user.userUid,
            email: user.email,
            nativeLanguage: nativeLanguage,
            languageToLearn: studiedLanguage,
            trainingCardsList: user.trainingCardsList,
            numberOfCards: user.numberOfCards
        }
        saveUser(updatedUser).then(() => {
            dispatch(setUser(updatedUser));
            setIsModalOpen(true);
            setModalContent({title: 'Success', body: 'The user data got saved.'});
            setIsLoading(false);
        }).catch(error => {
            console.error('error saveUser Settings', error);
            setIsModalOpen(true);
            setModalContent({title: 'Error', body: "The user data couldn't get saved."});
            setIsLoading(false);
        });
    };

    return (
        <motion.div
            className={'Component_Settings'}
        >
            <div className={'Component_Settings__contentWrapper'}>
                <div className={'Component_Settings__instruction'}>Settings</div>
                <div className={'Component_Settings__cardsWrapper'}>
                    <div className={'Component_Settings__card'}>
                        <div className={'Component_Settings__cardTitle'}>Personal data</div>
                        <div className={'Component_Settings__subtitle'}>{user.email}</div>
                        <div className={'Component_Settings__subtitle'}><span className={'Component_Settings__accent'}>{user.numberOfCards}</span> cards created</div>
                    </div>
                    <div className={'Component_Settings__lastCard'}>
                        <InputCustom label={'Native language'} value={nativeLanguage} setValue={setNativeLanguage}/>
                        <InputCustom label={'Studied language'} value={studiedLanguage} setValue={setStudiedLanguage}/>
                    </div>
                </div>

                <ButtonCustom onClick={handleSave} isLoading={isLoading}>Save</ButtonCustom>
                <ButtonCustom onClick={handleSignOut}>Sign out</ButtonCustom>
            </div>
            <ModalCustom visible={isModalOpen} setVisible={setIsModalOpen} title={modalContent.title}>
                {modalContent.body}
            </ModalCustom>
        </motion.div>
    );
};
