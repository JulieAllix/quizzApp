import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { motion } from "framer-motion";
import {v4 as uuidv4} from 'uuid';

import {ButtonCustom} from "../../components/ButtonCustom";
import {InputCustom} from "../../components/InputCustom";
import {ModalCustom} from "../../components/ModalCustom";
//import {SelectCustom} from "../../components/SelectCustom";

import {setUser} from "@Utils/redux/reducers";
import {
    createLanguage,
    getLanguagesOfUser,
    saveUser,
    signOut
} from "@Utils/firebaseConfig";
import {State} from "@Utils/redux/store";
import "./Settings.scss";
import {DropdownCustom} from "../../components/DropdownCustom";

interface Props {

}

export const Settings = (props: Props) => {
    const user = useSelector((state: State) => state.user);
    const dispatch = useDispatch();

    const [nativeLanguage, setNativeLanguage] = useState<string>(user.nativeLanguage);
    const [studiedLanguage, setStudiedLanguage] = useState<{name: string, code: string}>(null);
    console.log("studiedLanguage", studiedLanguage)
    const [newLanguage, setNewLanguage] = useState<string>('');
    const [languagesdata, setLanguagesdata] = useState<{name: string, code: string}[]>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<{title: string, body: string}>({title: '', body: ''});

    useEffect(() => {
        if (languagesdata) {
            const languageToLearnData = languagesdata.find(languageItem => languageItem.code === user.languageToLearn);
            setStudiedLanguage(languageToLearnData)
        }
    }, [user.languageToLearn, languagesdata]);

    useEffect(() => {
        getLanguagesOfUser(user).then(_languages => {
            const reformattedData = _languages.map(language => {
                return {
                    name: language.languageName,
                    code: language.languageUid
                }
            });
            setLanguagesdata(reformattedData)
        }).catch(error => console.error('error getLanguagesOfUser', error));
    }, []);

    const handleSignOut = (): void => {
        dispatch(setUser(null));
        signOut().catch(error => console.error('error signOut', error));
    };

    const handleSave = (): void => {
        setIsLoading(true);
        const updatedUser = {
            userUid: user.userUid,
            email: user.email,
            nativeLanguage: nativeLanguage,
            languageToLearn: studiedLanguage.code,
            trainingCardsList: user.trainingCardsList,
            numberOfCards: user.numberOfCards,
            languages: user.languages
        }
        saveUser(updatedUser).then(() => {
            dispatch(setUser(updatedUser));
            setIsModalOpen(true);
            setModalContent({title: 'Success', body: 'The user data got saved.'});
            setIsLoading(false);
        }).catch(error => {
            console.error('error saveUser Settings', error);
            setIsModalOpen(true);
            setModalContent({title: 'Error', body: "The user data couldn't get saved."});
            setIsLoading(false);
        });
    };

    const handleSaveNewLanguage = () => {
        setIsLoading(true);
        const newLanguageUid = uuidv4();
        const languageData = {
            languageUid: newLanguageUid,
            languageName: newLanguage
        }
        createLanguage(languageData).then(() => {
            const updatedLanguages = [...user.languages];
            updatedLanguages.push(newLanguageUid);

            const updatedUserData = {
                ...user,
                languages: updatedLanguages
            };

            saveUser(updatedUserData).then(newUserData => {
                dispatch(setUser(newUserData));
                setIsAddModalOpen(false);
                setIsModalOpen(true);
                setModalContent({title: 'Success', body: 'The new language got saved.'});
                setIsLoading(false);
                setNewLanguage('');
            }).catch(error => {
                console.error("error createLanguage", error);
                setIsAddModalOpen(false);
                setIsModalOpen(true);
                setModalContent({title: 'Error', body: "The new language couldn't get saved."});
                setIsLoading(false);
                setNewLanguage('');
            });
        }).catch(error => {
            console.error("error createLanguage", error);
            setIsAddModalOpen(false);
            setIsModalOpen(true);
            setModalContent({title: 'Error', body: "The new language couldn't get saved."});
            setIsLoading(false);
            setNewLanguage('');
        })
    };
/*
    const handleCreateNewCollection = (): void => {
        getAllBackupCardsOfUser(user.userUid).then(allData => {
            allData.map(data => {
                const newData = {
                    userUid: data.userUid,
                    cardUid: data.cardUid,
                    nativeLanguageValue: data.nativeLanguageValue,
                    languageToLearnValue: data.languageToLearnValue,
                    languageUid: '35d5fbc5-1aef-430e-972c-06359633ced2',
                }
                createCard(newData).then(() => {
                    console.log('ok')
                }).catch(error => console.error("error createCardBis", error))
            })
        }).catch(error => console.error("error getAllCardsOfUser", error))
    }
*/
    return (
        <motion.div
            className={'Component_Settings'}
        >
            <div className={'Component_Settings__contentWrapper'}>
                <div className={'Component_Settings__instruction'}>Settings</div>
                <div className={'Component_Settings__cardsWrapper'} style={{height: `${window.innerHeight*0.8}px`}}>
                    <div className={'Component_Settings__card'}>
                        <div className={'Component_Settings__cardTitle'}>Personal data</div>
                        <div className={'Component_Settings__subtitle'}>{user.email}</div>
                        <div className={'Component_Settings__subtitle'}><span className={'Component_Settings__accent'}>{user.numberOfCards}</span> cards created</div>
                    </div>
                    <div className={'Component_Settings__lastCard'}>
                        <InputCustom label={'Native language'} value={nativeLanguage} setValue={setNativeLanguage}/>
                        <DropdownCustom
                            label={'Studied language'}
                            placeholder={""}
                            list={languagesdata}
                            selectedValue={studiedLanguage}
                            setSelectedValue={setStudiedLanguage}
                        />
                        {/*
                                                <SelectCustom
                            label={'Studied language'}
                            selectedValues={studiedLanguage}
                            setSelectedValues={setStudiedLanguage}
                            list={languagesdata}
                            placeholder={""}
                            selectionLimit={1}
                        />
                        */}

                        <ButtonCustom onClick={handleSave} isLoading={isLoading}>Save</ButtonCustom>
                        <ButtonCustom onClick={() => setIsAddModalOpen(true)}>Add new language</ButtonCustom>
                    </div>
                    <div className={'Component_Settings__buttonsWrapper'}>
                        <div style={{width: "10px"}}/>
                        <ButtonCustom onClick={handleSignOut}>Sign out</ButtonCustom>
                    </div>
                </div>

            </div>
            <ModalCustom visible={isModalOpen} setVisible={setIsModalOpen} title={modalContent.title}>
                {modalContent.body}
            </ModalCustom>
            <ModalCustom visible={isAddModalOpen} setVisible={setIsAddModalOpen} title={"Add a new language"} buttonAction={handleSaveNewLanguage}>
                <InputCustom label={'New language'} value={newLanguage} setValue={setNewLanguage}/>
            </ModalCustom>
        </motion.div>
    );
};
/*
                        <ButtonCustom onClick={handleCreateNewCollection} isLoading={isLoading}>Save new cards</ButtonCustom>
 */
