import * as React from "react";

import {Button} from "antd";

import "./ButtonCustom.scss";

interface Props {
    color: 'orange' | 'yellow'
    onClick: () => void
}

export const ButtonCustom: React.FC<Props> = (props) => {

    return (
        <div className={'Component_ButtonCustom'}>
            <div className={props.color === 'yellow' ? 'Component_ButtonCustom__buttonWrapperYellow' : 'Component_ButtonCustom__buttonWrapperOrange'}>
                <Button size={"large"} shape={"round"} onClick={props.onClick}>
                    {props.children}
                </Button>
            </div>
        </div>
    );
};
