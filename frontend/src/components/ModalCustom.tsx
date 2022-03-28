import * as React from "react";
import { Dialog } from 'primereact/dialog';

import {ButtonCustom} from "./ButtonCustom";

import "./ModalCustom.scss";

interface Props {
    visible: boolean;
    setVisible: (value: boolean) => void;
    title: string;
    buttonAction?: () => void;
}

export const ModalCustom: React.FC<Props> = (props) => {

    const renderHeader = (): JSX.Element => {
        return (
            <div className="Component_ModalCustom__modalHeader">
                <span className={'Component_ModalCustom__modalTitle'}>{props.title}</span>
            </div>
        );
    };

    const renderFooter = (): JSX.Element => {
        return (
            <div className="Component_ModalCustom__modalFooter">
                <ButtonCustom onClick={props.buttonAction ? props.buttonAction : () => props.setVisible(false)}>Ok</ButtonCustom>
            </div>
        )
    }

    const header = renderHeader();
    const footer = renderFooter();
    return (
        <div className={'Component_ModalCustom'}>
            <Dialog
                header={header}
                footer={footer}
                visible={props.visible}
                onHide={() => props.setVisible(false)}
                style={{width: "95vw"}}
            >
                <div className={'Component_ModalCustom__modalContent'}>
                {props.children}
                </div>
            </Dialog>
        </div>
    );
};
