import * as React from "react";

import "./AppHeader.scss";

interface Props {

}

export const AppHeader = (props: Props) => {


    return (
        <div className={'Component_AppHeader'}>
            <span className={'Component_AppHeader__name'}>Quizz App</span>
        </div>
    );
};
