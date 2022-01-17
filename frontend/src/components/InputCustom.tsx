import * as React from "react";
import {InputText} from "primereact/inputtext";

import "./InputCustom.scss";

interface Props {
    label?: string;
    value: string ;
    setValue: (value: string) => void
}

export const InputCustom = (props: Props) => {

    return (
        <div className={'Component_InputCustom'}>
                {props.label &&
                    <div className={'Component_InputCustom__label'}>{props.label}</div>
                }
                <InputText
                    className={"w-full Component_CustomInput__input"}
                    value={props.value}
                    onChange={(e) => props.setValue(e.target.value)}
                />
        </div>
    );
};
