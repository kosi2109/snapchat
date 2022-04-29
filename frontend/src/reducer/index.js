import  authReducer  from './authReducer'
import chatReducer from "./chatReducer"
import usersReducer from "./usersReducer"
import messageReducer from "./messageReducer"
import {combineReducers} from "redux";

export const reducers = combineReducers({
    auth : authReducer,
    chats : chatReducer,
    users : usersReducer,
    messages : messageReducer
})