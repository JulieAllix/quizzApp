import * as React from "react";
import {useState} from "react";
import {useHistory} from "react-router";

import {ButtonCustom} from "../../components/ButtonCustom";
import {InputCustom} from "../../components/InputCustom";
import {ModalCustom} from "../../components/ModalCustom";

import {registerWithEmailAndPassword, saveUser} from "@Utils/firebaseConfig";
import "./SignUp.scss";

interface Props {

}

export const SignUp = (props: Props) => {
    const history = useHistory();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [nativeLanguage, setNativeLanguage] = useState<string>('');
    const [studiedLanguage, setStudiedLanguage] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<{title: string, body: string}>({title: '', body: ''});

    const handleSignUp = () => {
        registerWithEmailAndPassword(email, password).then(createdUser => {
            saveUser({
                userUid: createdUser.user.uid,
                email: email,
                nativeLanguage: nativeLanguage,
                languageToLearn: studiedLanguage,
            }).then(() => {
                setIsModalOpen(true);
                setModalContent({title: 'Success', body: "Your account successfully got created."});
            }).catch(error => {
                console.log('error saveUser', error);
                setIsModalOpen(true);
                setModalContent({title: 'Error', body: "Your account couldn't get created."});
            });
        }).catch(error => {
            console.log('error registerWithEmailAndPassword', error);
            setIsModalOpen(true);
            if (error.code === "auth/email-already-in-use") {
                setModalContent({title: 'Error', body: "An account already exists for this e-mail address."});
            } else if (error.code === "auth/weak-password") {
                setModalContent({title: 'Error', body: "Your password should contain at least 6 characters."});
            } else {
                setModalContent({title: 'Error', body: "Your account creation failed."});
            }
        });
    };

    return (
    <div className={'Component_SignUp'}>
        <div className={'Component_SignUp__titleWrapper'}>
            <div className={'Component_SignUp__title'}>Quizz App</div>
        </div>
        <div className={'Component_SignUp__contentWrapper'}>
            <div className={'Component_SignUp__subtitle'}>
                Sign up
            </div>
            <div className={'Component_SignUp__inputsWrapper'}>
                <InputCustom label={'E-mail address'} value={email} setValue={setEmail}/>
                <InputCustom label={'Password'} value={password} setValue={setPassword}/>
                <InputCustom label={'Native language'} value={nativeLanguage} setValue={setNativeLanguage}/>
                <InputCustom label={'Studied language'} value={studiedLanguage} setValue={setStudiedLanguage}/>
            </div>
            <ButtonCustom color={'yellow'} onClick={handleSignUp}>Register</ButtonCustom>
            <div className={'Component_SignUp__linkWrapper'}>
                <div className={'Component_SignUp__link'} onClick={() => history.push("/sign-in")}>Sign in</div>
            </div>
            <ModalCustom visible={isModalOpen} setVisible={setIsModalOpen} title={modalContent.title}>
                {modalContent.body}
            </ModalCustom>
        </div>
    </div>
    )
};
