import React from "react";

import {AppHeader} from "../../components/AppHeader";
import {Quizz} from "../../pages/quizz/Quizz";

interface Props {

}

export const QuizzTab: React.FC<Props> = (props) => {

    return (
        <div>
            <AppHeader />
            <Quizz />
        </div>
    );
}
