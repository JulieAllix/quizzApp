import * as React from "react";
import {useState} from "react";
import {v4} from "uuid";

import {ButtonCustom} from "../../components/ButtonCustom";
import {InputCustom} from "../../components/InputCustom";
import {ModalCustom} from "../../components/ModalCustom";

import {createSpanishData} from "@Utils/firebaseConfig";
import "./Form.scss";

interface Props {

}

export const Form = (props: Props) => {
    const [frenchValue, setFrenchValue] = useState<string>('');
    const [spanishValue, setSpanishValue] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<{title: string, body: string}>({title: '', body: ''});

    const handleSend = () => {
        if (frenchValue === '') {
            setIsModalOpen(true);
            setModalContent({title: 'Erreur', body: "Veuillez saisir la valeur en français, svp."});
        } else if (spanishValue === '') {
            setIsModalOpen(true);
            setModalContent({title: 'Erreur', body: "Veuillez saisir la valeur en espagnol, svp."});
        } else {
            createSpanishData(v4(), {frenchValue: frenchValue, spanishValue: spanishValue}).then(response => {
                console.log('response createSpanishData', response);
                setIsModalOpen(true);
                setModalContent({title: 'Confirmation', body: 'Votre fiche a bien été ajoutée à la base de données !'});
                setFrenchValue('');
                setSpanishValue('');
            }).catch(error => {
                console.log('error createSpanishData', error);
                setIsModalOpen(true);
                setModalContent({title: 'Erreur', body: "Votre fiche n'a pas été ajoutée à la base de données."});
            });
        }
    };

    return (
        <div className={'Component-Form'}>
            <div className={'Component-Form__instruction'}>Veuillez saisir les valeurs de votre nouvelle carte de quizz :</div>
            <InputCustom label={'Valeur en français'} value={frenchValue} setValue={setFrenchValue}/>
            <InputCustom label={'Valeur en espagnol'} value={spanishValue} setValue={setSpanishValue}/>
            <ButtonCustom color={'green'} onClick={handleSend}>Envoyer</ButtonCustom>
            <ModalCustom visible={isModalOpen} setVisible={setIsModalOpen} title={modalContent.title}>
                {modalContent.body}
            </ModalCustom>
        </div>
    );
};
