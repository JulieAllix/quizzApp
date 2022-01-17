import * as React from "react";
import {InputNumber} from "primereact/inputnumber";

import "./InputNumberCustom.scss";

interface Props {
    label?: string;
    value: number;
    setValue: (value: number) => void
}

export const InputNumberCustom = (props: Props) => {

    return (
        <div className={'Component_InputNumberCustom'}>
            {props.label &&
            <div className={'Component_InputNumberCustom__label'}>{props.label}</div>
            }
            <InputNumber
                className={"w-full Component_InputNumberCustom__input"}
                value={props.value}
                onChange={(e) => props.setValue(e.value)}
            />
        </div>
    );
};
