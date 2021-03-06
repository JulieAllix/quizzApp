import * as React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";

import {ButtonCustom} from "../../components/ButtonCustom";
import {InputCustom} from "../../components/InputCustom";

import {getUserFirebaseData, loginWithEmailAndPassword} from "@Utils/firebaseConfig";
import {setUser} from "@Utils/redux/reducers";
import {User} from "@Models/types/bases/User";
import "./SignIn.scss";

interface Props {

}

export const SignIn = (props: Props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSignIn = () => {
        setIsLoading(true);
        loginWithEmailAndPassword(email, password).then(response => {
            console.log('response loginWithEmailAndPassword', response);
            if (response.user !== null) {
                getUserdata(response);
            }
        }).catch(error => {
            console.log('error loginWithEmailAndPassword', error);
            setIsLoading(false);
        });
    };

    const getUserdata = (response: any): void => {
        getUserFirebaseData(response.user!.uid).then((__response: User) => {
            if (__response !== undefined) {
                dispatch(setUser(__response));
                setIsLoading(false);
            } else {
                // TODO : feedback d'erreur: Ce compte n'existe pas.
                setIsLoading(false);
            };
        }).catch(error => {
            console.error('error getUserFirebaseData', error);
            setIsLoading(false);
        });
    };

    return (
        <div className={'Component_SignIn'}>
            <div className={'Component_SignIn__titleWrapper'}>
                <div className={'Component_SignIn__title'}>Quizz App</div>
                <div className={'Component_SignIn__subtitle'}>The app that helps you studying your vocabulary</div>
            </div>
            <div className={'Component_SignIn__welcome'}>Welcome back !</div>

            <div className={'Component_SignIn__contentWrapper'}>
                <div className={'Component_SignIn__inputsWrapper'}>
                    <InputCustom label={'E-mail address'} value={email} setValue={setEmail}/>
                    <InputCustom label={'Password'} value={password} setValue={setPassword}/>
                </div>
                <ButtonCustom isLoading={isLoading} onClick={handleSignIn}>Sign in</ButtonCustom>
                <div className={'Component_SignIn__linkWrapper'}>
                    <div className={'Component_SignIn__link'} onClick={() => history.push("/sign-up")}>Sign up</div>
                </div>
            </div>
        </div>
    )
};
