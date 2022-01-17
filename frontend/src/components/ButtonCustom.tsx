import * as React from "react";
import { ProgressSpinner } from 'primereact/progressspinner';
import {Button} from "primereact/button";

import "./ButtonCustom.scss";

interface Props {
    onClick: () => void;
    isLoading?: boolean;
}

export const ButtonCustom: React.FC<Props> = (props) => {

    return (
        <div className={'Component_ButtonCustom'}>
            <Button className={"Component_ButtonCustom__button w-full"} onClick={props.isLoading ? () => {} : props.onClick}>
                <span className={'Component_ButtonCustom__text'}>
                {props.isLoading ?<ProgressSpinner style={{height: "30px", width: "30px"}} /> : props.children}
                </span>
            </Button>
        </div>
    );
};
