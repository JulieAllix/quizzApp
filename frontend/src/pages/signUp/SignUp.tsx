import * as React from "react";
import {useState} from "react";
import {useHistory} from "react-router";

import {ButtonCustom} from "../../components/ButtonCustom";
import {InputCustom} from "../../components/InputCustom";

import {registerWithEmailAndPassword} from "@Utils/firebaseConfig";
import "./SignUp.scss";

interface Props {

}

export const SignUp = (props: Props) => {
    const history = useHistory();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSignUp = () => {
        registerWithEmailAndPassword(email, password).then(response => {
            console.log('response registerWithEmailAndPassword', response);
        }).catch(error => {
            console.log('error registerWithEmailAndPassword', error);
        });
    };

    return (
    <div className={'Component_SignUp'}>
        <div className={'Component_SignUp__titleWrapper'}>
            <div className={'Component_SignUp__title'}>Quizz</div>
            <div className={'Component_SignUp__title'}>App</div>
        </div>
        <div className={'Component_SignUp__contentWrapper'}>
            <div className={'Component_SignUp__subtitle'}>
                Sign up
            </div>
            <div className={'Component_SignUp__inputsWrapper'}>
                <InputCustom label={'E-mail address'} value={email} setValue={setEmail}/>
                <InputCustom label={'Password'} value={password} setValue={setPassword}/>
            </div>
            <ButtonCustom color={'yellow'} onClick={handleSignUp}>Register</ButtonCustom>
            <div className={'Component_SignUp__linkWrapper'}>
                <div className={'Component_SignUp__link'} onClick={() => history.push("/sign-in")}>Sign in</div>
            </div>
        </div>
    </div>
    )
};
