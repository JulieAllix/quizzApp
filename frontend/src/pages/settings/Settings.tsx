import * as React from "react";
import { motion } from "framer-motion";

import {ButtonCustom} from "../../components/ButtonCustom";
import {useDispatch} from "react-redux";
import {setUser} from "@Utils/redux/reducers";
import {signOut} from "@Utils/firebaseConfig";

import "./Settings.scss";

interface Props {

}

export const Settings = (props: Props) => {

    const dispatch = useDispatch();

    const handleSignOut = (): void => {
        dispatch(setUser(null));
        signOut().catch(error => console.error('error signOut', error));
    };

    return (
        <motion.div
            className={'Component_Settings'}
        >
            <div className={'Component_Settings__contentWrapper'}>
                <div className={'Component_Settings__instruction'}>Settings</div>
                <ButtonCustom color={'yellow'} onClick={handleSignOut}>Sign out</ButtonCustom>
            </div>
        </motion.div>
    );
};
