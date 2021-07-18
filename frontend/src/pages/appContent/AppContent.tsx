import * as React from "react";
import {useState} from "react";
import { Tabs } from 'antd';

import {Form} from "../form/Form";
import {Quizz} from "../quizz/Quizz";

import "./AppContent.scss";


interface Props {

}

export const AppContent = (props: Props) => {
    const [tab, setTab] = useState<string>('1');

    const { TabPane } = Tabs;

    const callback = (key) => {
        setTab(key);
    };

    return (
        <div className={'Component-AppContent'}>
            <Tabs defaultActiveKey={tab} onChange={callback}>
                <TabPane tab="Form" key="1">
                    <Form />
                </TabPane>
                <TabPane tab="Quizz" key="2">
                    <Quizz />
                </TabPane>
            </Tabs>
        </div>
    )
};
