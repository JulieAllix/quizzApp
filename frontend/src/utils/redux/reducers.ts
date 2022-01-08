import {combineReducers} from "redux";
import {User} from "../../../../models/types/bases/User";
import {createAction, handleActions} from 'redux-actions';

export const setUser = createAction<User>("setUser");

const initialState = null as User;
// ACTIONS

export const userReducer = handleActions({
    ["setUser"]: (state, action) => {
        return action.payload;
    }
}, initialState);

export const reducers = combineReducers({
    user: userReducer,
});
