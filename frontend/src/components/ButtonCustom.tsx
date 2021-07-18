import * as React from "react";

import {Button} from "antd";

import "./ButtonCustom.scss";

interface Props {
    onClick: () => void
}

export const ButtonCustom: React.FC<Props> = (props) => {

    return (
        <div className={'Component-ButtonCustom'}>
            <div className={'Component-ButtonCustom__buttonWrapper'}>
                <Button size={"large"} shape={"round"} onClick={props.onClick}>
                    {props.children}
                </Button>
            </div>
        </div>
    );
};
