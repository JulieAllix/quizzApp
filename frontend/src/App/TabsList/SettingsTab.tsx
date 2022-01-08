import React from "react";

import {AppHeader} from "../../components/AppHeader";
import {Settings} from "../../pages/settings/Settings";


interface Props {

}

export const SettingsTab: React.FC<Props> = (props) => {

    return (
        <div>
            <AppHeader />
            <Settings />
        </div>
    );
}
