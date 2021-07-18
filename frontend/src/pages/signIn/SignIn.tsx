import * as React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";

import {ButtonCustom} from "../../components/ButtonCustom";
import {InputCustom} from "../../components/InputCustom";

import {loginWithEmailAndPassword} from "@Utils/firebaseConfig";
import {setUser} from "@Utils/redux/reducers";
import "./SignIn.scss";

interface Props {

}

export const SignIn = (props: Props) => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>('allixjulie@gmail.com');
    const [password, setPassword] = useState<string>('123456');

    const handleSignIn = () => {
        loginWithEmailAndPassword(email, password).then(response => {
            console.log('response loginWithEmailAndPassword', response);
            if (response.user !== null) {
                dispatch(setUser(response.user));
            }
        }).catch(error => {
            console.log('error loginWithEmailAndPassword', error);
        });
    };

    return (
        <div className={'Component-SignIn'}>
            <div className={'Component-SignIn__inputsWrapper'}>
                <InputCustom label={'Adresse e-mail'} value={email} setValue={setEmail}/>
                <InputCustom label={'Mot de passe'} value={password} setValue={setPassword}/>
                <ButtonCustom onClick={handleSignIn}>Se connecter</ButtonCustom>
            </div>
        </div>
    )
};
