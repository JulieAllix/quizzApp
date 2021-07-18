import * as React from "react";

import {Button} from "antd";

import "./ButtonCustom.scss";

interface Props {
    color: 'green' | 'yellow'
    onClick: () => void
}

export const ButtonCustom: React.FC<Props> = (props) => {

    return (
        <div className={'Component-ButtonCustom'}>
            <div className={props.color === 'green' ? 'Component-ButtonCustom__buttonWrapperGreen' : 'Component-ButtonCustom__buttonWrapperYellow'}>
                <Button size={"large"} shape={"round"} onClick={props.onClick}>
                    {props.children}
                </Button>
            </div>
        </div>
    );
};
