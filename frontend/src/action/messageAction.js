import * as api from "../api"
import { AUTH_ERROR } from "../constants/authConstant"
import { END_MESSAGE_LOADING, GET_MESSAGES, GET_NOTI, MESSAGE_LOADING, SENT_MESSAGE } from "../constants/messageConstant"


export const getMessages = (id)=> async(dispatch)=>{
    try {
        dispatch({type:MESSAGE_LOADING})
        const {data} = await api.getMessagesAPI(id)
        dispatch({type:GET_MESSAGES,payload:data})
        dispatch({type:END_MESSAGE_LOADING})
    } catch (error) {
        dispatch({type:AUTH_ERROR,payload:error.response.data})
    }
}

export const sentMessage = (formData,socket)=> async(dispatch)=>{
    try {
        const {data} = await api.sentMessageAPI(formData)
        socket.emit("new message", data);
        dispatch({type:SENT_MESSAGE,payload:data})
    } catch (error) {
        dispatch({type:AUTH_ERROR,payload:error.response.data})
    }
}

export const receiveMessage = (message)=> async(dispatch)=>{
    dispatch({type:SENT_MESSAGE,payload:message})
}


export const receiveNoti = (message)=> async(dispatch)=>{
    dispatch({type:GET_NOTI,payload:message})
}