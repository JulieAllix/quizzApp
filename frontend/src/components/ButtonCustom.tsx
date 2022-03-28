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
                {props.isLoading ?
                    <div className={'Component_ButtonCustom__loadingWrapper'}>
                        <div className={'Component_ButtonCustom__text'}>Loading</div>
                        <ProgressSpinner style={{height: "24px", width: "24px", margin: "0 0 0 12px"}} />
                    </div>
                :
                    <span className={'Component_ButtonCustom__text'}>
                        {props.children}
                    </span>
                }
            </Button>
        </div>
    );
};
