import React from "react";
import {Switch} from "react-router-dom";
import {Route} from "react-router";
import {Form} from "../../pages/form/Form";
import {AppHeader} from "../../components/AppHeader";

interface Props {

}

export const FormTab: React.FC<Props> = (props) => {


    return (
            <div className={'Component_FormTab'}>
                <AppHeader />
                <Switch>
                    <Route path="/app-content"
                           render={() => <Form/>}
                           exact={true}/>
                </Switch>
            </div>
    );
}
