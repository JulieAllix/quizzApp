import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
//import {createLogger} from 'redux-logger';
import {save as saveLocalStorage, load as loadLocalStorage} from 'redux-localstorage-simple';
import { composeWithDevTools } from 'redux-devtools-extension';

//import {env} from "../../env";
import {reducers} from "./reducers";
import {User} from "../../../../models/types/bases/User";

const localStorageConfig = {
    namespace: "quizzApp",
    states: [
        "user",
    ]
};

let middlewares = [thunk, saveLocalStorage(localStorageConfig)]
/*
if (env.isProduction) {
    middlewares = [createLogger(), ...middlewares];
}
 */

export interface State {
    user: User,
};

export function buildStore() {
    const store = createStore(
        reducers,
        loadLocalStorage(localStorageConfig), // Initial state
        composeWithDevTools(applyMiddleware(...middlewares))
    );

    return store;
}
