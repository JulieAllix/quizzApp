import {combineReducers} from "redux";
import {User} from "../../../../models/types/bases/User";

/* STATE DEFINITION  */
interface UserState {
    user: User | null,
}

const initialState: UserState = {
    user: null,
}
// ACTIONS

export function setUser(newUser: User) {
    return {
        type: "update_user",
        payload: newUser
    }
}

// REDUCERS

const userReducer = (state = initialState, action: any) => {
    if (action.type === "update_user") {
        if (action.payload && action.payload.name === "Error") {
            return {...state}
        }

        return action.payload;
    }
    return state
};

export const reducers = combineReducers({
    user: userReducer,
});
