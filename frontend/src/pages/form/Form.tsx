import * as React from "react";
import {useState} from "react";
import {v4} from "uuid";
import { motion } from "framer-motion";

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
            setModalContent({title: 'Error', body: "Please enter the french word."});
        } else if (spanishValue === '') {
            setIsModalOpen(true);
            setModalContent({title: 'Error', body: "Please enter the spanish translation."});
        } else {
            createSpanishData(v4(), {frenchValue: frenchValue, spanishValue: spanishValue}).then(response => {
                console.log('response createSpanishData', response);
                setIsModalOpen(true);
                setModalContent({title: 'Success', body: 'Your card has been successfully added to the database !'});
                setFrenchValue('');
                setSpanishValue('');
            }).catch(error => {
                console.log('error createSpanishData', error);
                setIsModalOpen(true);
                setModalContent({title: 'Error', body: "Your card couldn't get added to the database."});
            });
        }
    };

    return (
        <motion.div
            className={'Component_Form'}
        >
            <div className={'Component_Form__contentWrapper'}>
                <div className={'Component_Form__instruction'}>New quizz card</div>
                <InputCustom label={'French word'} value={frenchValue} setValue={setFrenchValue}/>
                <InputCustom label={'Spanish translation'} value={spanishValue} setValue={setSpanishValue}/>
                <ButtonCustom color={'yellow'} onClick={handleSend}>Save</ButtonCustom>
                <ModalCustom visible={isModalOpen} setVisible={setIsModalOpen} title={modalContent.title}>
                    {modalContent.body}
                </ModalCustom>
            </div>
        </motion.div>
    );
};
