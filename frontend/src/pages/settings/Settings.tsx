import * as React from "react";
import { motion } from "framer-motion";
import {v4} from "uuid";

import {ButtonCustom} from "../../components/ButtonCustom";
import {useDispatch} from "react-redux";
import {setUser} from "@Utils/redux/reducers";
import {getAllCards, saveDataBase, signOut} from "@Utils/firebaseConfig";

import "./Settings.scss";

interface Props {

}

export const Settings = (props: Props) => {
    const dispatch = useDispatch();

    const handleSignOut = (): void => {
        dispatch(setUser(null));
        signOut().catch(error => console.error('error signOut', error));
    };

    const handleCreateUser = (): void => {

    };

    const handleCreateDb = (): void => {
        getAllCards().then(response => {
            const data = response.map(card => {
                return {
                    cardUid: card.uid,
                    nativeLanguageValue: card.frenchValue,
                    languageToLearnValue: card.spanishValue,
                }
            });
            const _data = {
                dataBaseUid: v4(),
                dataBaseArray: data
            }
            saveDataBase(_data).catch(error => console.error("error saveDataBase", error))
        }).catch(error => console.error("error getAllCards", error))

    };

    return (
        <motion.div
            className={'Component_Settings'}
        >
            <div className={'Component_Settings__contentWrapper'}>
                <div className={'Component_Settings__instruction'}>Settings</div>
                <ButtonCustom color={'yellow'} onClick={handleSignOut}>Sign out</ButtonCustom>
                <ButtonCustom color={'yellow'} onClick={handleCreateUser}>Create User</ButtonCustom>
                <ButtonCustom color={'yellow'} onClick={handleCreateDb}>Create DB</ButtonCustom>
            </div>
        </motion.div>
    );
};
