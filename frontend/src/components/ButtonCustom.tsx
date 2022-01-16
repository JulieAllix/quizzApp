import * as React from "react";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {Button} from "antd";

import "./ButtonCustom.scss";

interface Props {
    onClick: () => void;
    isLoading?: boolean;
}

export const ButtonCustom: React.FC<Props> = (props) => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24, color: "white" }} spin />;

    return (
        <div className={'Component_ButtonCustom'}>
            <div className={'Component_ButtonCustom__buttonWrapper'}>
                <Button size={"large"} shape={"round"} onClick={props.isLoading ? () => {} : props.onClick}>
                    {props.isLoading ? <Spin indicator={antIcon} /> : props.children}
                </Button>
            </div>
        </div>
    );
};
