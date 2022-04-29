import { ACTIVE_USERS, AUTH_ERROR, AUTH_LOADING, END_AUTH_LOADING, LOGIN, UPDATE_PROFILE } from "../constants/authConstant"
import * as api from "../api"



export const login = (form,navigate)=> async(dispatch)=>{
    dispatch({type:AUTH_LOADING})
    try {
        const {data} = await api.loginAPI(form)
        dispatch({type:LOGIN,payload:data})
        dispatch({type:END_AUTH_LOADING})
        navigate('/',{replace:true})
    } catch (error) {
        dispatch({type:AUTH_ERROR,payload:error.response.data})
        dispatch({type:END_AUTH_LOADING})
    }
}


export const updateProfile = (url)=> async(dispatch)=>{
    try {
        const {data} = await api.updateUserAPI({pic:url})
        dispatch({type:UPDATE_PROFILE,payload:data})
    } catch (error) {
        dispatch({type:END_AUTH_LOADING})
    }
} 


export const register = (form,navigate)=> async(dispatch)=>{
    dispatch({type:AUTH_LOADING})
    try {
        const {data} = await api.registerAPI(form)
        dispatch({type:LOGIN,payload:data})
        dispatch({type:END_AUTH_LOADING})
        navigate('/',{replace:true})
    } catch (error) {
        dispatch({type:AUTH_ERROR,payload:error.response.data})
        dispatch({type:END_AUTH_LOADING})
    }
}



export const setActiveUsers = (users)=> async(dispatch)=>{
    dispatch({type:ACTIVE_USERS,payload:users})
}