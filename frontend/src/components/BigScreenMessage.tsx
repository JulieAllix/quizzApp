import React from "react";

import {PictogramCustom} from "./PictogramCustom";

// @ts-ignore
import background from "../assets/images/background_1.png";
import "./BigScreenMessage.scss";

interface Props {

}

export const BigScreenMessage: React.FC<Props> = (props) => {

    return (
        <div className={'Component_BigScreenMessage'} style={{backgroundImage: `url(${background})`}}>
            <div className={'Component_App__logo'}>
                <PictogramCustom name={'Brain'} width={'40px'} />
            </div>
            <div className={'Component_BigScreenMessage__titleWrapper'}>
                <div className={'Component_BigScreenMessage__title'}>Quizz App</div>
                <div className={'Component_BigScreenMessage__subtitle'}>The app that helps you studying your vocabulary</div>
            </div>
            <div className={'Component_SignIn__welcome'}>This app is designed for mobile use only. Use it on your phone or reduce the size of the screen.</div>
            <div />
        </div>
    )
}

