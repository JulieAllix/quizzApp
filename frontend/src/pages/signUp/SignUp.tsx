import * as React from "react";
import {useState} from "react";

import {ButtonCustom} from "../../components/ButtonCustom";
import {InputCustom} from "../../components/InputCustom";

import {registerWithEmailAndPassword} from "@Utils/firebaseConfig";
import "./SignUp.scss";

interface Props {

}

export const SignUp = (props: Props) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleRegister = () => {
        registerWithEmailAndPassword(email, password).then(response => {
            console.log('response registerWithEmailAndPassword', response);
        }).catch(error => {
            console.log('error registerWithEmailAndPassword', error);
        });
    };

    return (
        <div className={'Component-SignUp'}>
            <div className={'Component-SignUp__inputsWrapper'}>
                <InputCustom label={'Adresse e-mail'} value={email} setValue={setEmail}/>
                <InputCustom label={'Mot de passe'} value={password} setValue={setPassword}/>
                <ButtonCustom color={'green'} onClick={handleRegister}>S'inscrire</ButtonCustom>
            </div>
        </div>
    )
};
