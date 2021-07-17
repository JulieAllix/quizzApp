import * as React from "react";
import {useState} from "react";
import { Button, Input } from 'antd';

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
                <div className={'Component-SignUp__inputWrapper'}>
                    <div className={'Component-SignUp__label'}>Adresse e-mail</div>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        size={"large"}
                    />
                </div>
                <div className={'Component-SignUp__inputWrapper'}>
                    <div className={'Component-SignUp__label'}>Mot de passe</div>
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        size={"large"}
                    />
                </div>
                <div className={'Component-SignUp__buttonWrapper'}>
                    <Button size={"large"} shape={"round"} onClick={handleRegister}>
                        S'inscrire
                    </Button>
                </div>
            </div>
        </div>
    )
};
