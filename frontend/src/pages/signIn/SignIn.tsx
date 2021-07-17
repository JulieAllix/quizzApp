import * as React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import { Button, Input } from 'antd';

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
                <div className={'Component-SignIn__inputWrapper'}>
                    <div className={'Component-SignIn__label'}>Adresse e-mail</div>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        size={"large"}
                    />
                </div>
                <div className={'Component-SignIn__inputWrapper'}>
                    <div className={'Component-SignIn__label'}>Mot de passe</div>
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        size={"large"}
                    />
                </div>
                <div className={'Component-SignIn__buttonWrapper'}>
                    <Button size={"large"} shape={"round"} onClick={handleSignIn}>
                        Se connecter
                    </Button>
                </div>
            </div>
        </div>
    )
};
