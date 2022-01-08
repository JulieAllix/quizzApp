import * as React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";

import {ButtonCustom} from "../../components/ButtonCustom";
import {InputCustom} from "../../components/InputCustom";

import {loginWithEmailAndPassword} from "@Utils/firebaseConfig";
import {setUser} from "@Utils/redux/reducers";
import "./SignIn.scss";

interface Props {

}

export const SignIn = (props: Props) => {
    const history = useHistory();
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
        <div className={'Component_SignIn'}>
            <div className={'Component_SignIn__titleWrapper'}>
                <div className={'Component_SignIn__title'}>Quizz</div>
                <div className={'Component_SignIn__title'}>App</div>
            </div>
            <div className={'Component_SignIn__contentWrapper'}>
                <div className={'Component_SignIn__subtitle'}>
                    Sign in
                </div>
                <div className={'Component_SignIn__inputsWrapper'}>
                    <InputCustom label={'E-mail address'} value={email} setValue={setEmail}/>
                    <InputCustom label={'Password'} value={password} setValue={setPassword}/>
                </div>
                <ButtonCustom color={'yellow'} onClick={handleSignIn}>Log in</ButtonCustom>
                <div className={'Component_SignIn__linkWrapper'}>
                    <div className={'Component_SignIn__link'} onClick={() => history.push("/sign-up")}>Sign up</div>
                </div>
            </div>
        </div>
    )
};
