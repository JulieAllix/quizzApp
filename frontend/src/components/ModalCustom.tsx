import * as React from "react";
import {Modal} from "antd";

import {ButtonCustom} from "./ButtonCustom";

import "./ModalCustom.scss";

interface Props {
    visible: boolean;
    setVisible: (value: boolean) => void;
    title: string;
}

export const ModalCustom: React.FC<Props> = (props) => {

    return (
        <div className={'Component-ModalCustom'}>
            <Modal
                visible={props.visible}
                title={props.title}
                onOk={() => props.setVisible(false)}
                onCancel={() => props.setVisible(false)}
                footer={[
                    <ButtonCustom color={'green'} onClick={() => props.setVisible(false)}>Ok</ButtonCustom>
                ]}
            >
                <div className={'Component-ModalCustom__modalContent'}>
                {props.children}
                </div>
            </Modal>
        </div>
    );
};
