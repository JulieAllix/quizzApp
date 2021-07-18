import * as React from "react";
import {Input} from "antd";

import "./InputCustom.scss";

interface Props {
    label: string;
    value: string;
    setValue: (value: string) => void
}

export const InputCustom = (props: Props) => {

    return (
        <div className={'Component-InputCustom'}>
            <div className={'Component-InputCustom__inputWrapper'}>
                <div className={'Component-InputCustom__label'}>{props.label}</div>
                <Input
                    value={props.value}
                    onChange={(e) => props.setValue(e.target.value)}
                    size={"large"}
                />
            </div>
        </div>
    );
};
