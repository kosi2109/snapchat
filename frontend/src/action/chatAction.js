import * as api from "../api"
import { AUTH_ERROR } from "../constants/authConstant"
import { ACCESS_CHAT, ADD_USER_TO_GP, CHAT_LOADING, CREATE_GP_CHAT, DELETE_CHAT, END_CHAT_LOADING, GET_CHATS, SELECT_CHAT } from "../constants/chatConstant"

export const getAllChats = (reload=true)=> async(dispatch)=>{
    try {
        if(reload){
            dispatch({type:CHAT_LOADING})
        }
        const {data} = await api.getUsersAPI()
        dispatch({type:GET_CHATS,payload:data})
        dispatch({type:END_CHAT_LOADING})
    } catch (error) {
        dispatch({type:END_CHAT_LOADING})
        dispatch({type:AUTH_ERROR,payload:error.response.data})
    }
}

export const selectChat = (chat)=> async(dispatch)=>{
    dispatch({type:SELECT_CHAT,payload:chat})
}


export const accessChat = (chat,navigate)=> async(dispatch)=>{
    try {
        const {data} = await api.accessChat(chat)
        dispatch({type:ACCESS_CHAT,payload:data})
        navigate(`/${data._id}`, { replace: true });
    } catch (error) {
        dispatch({type:AUTH_ERROR,payload:error.response.data})
    }
}


export const getSingleChat = (id,navigate)=> async(dispatch)=>{
    
    try {
        const {data} = await api.getSingleChat(id)
        dispatch({type:ACCESS_CHAT,payload:data})
    } catch (error) {
        if(error.response.status === 404){
            navigate('/404',{replace:true})
        }else{
            dispatch({type:AUTH_ERROR,payload:error.response.data})
        }
    }
}



export const createGroupChat = (from,navigate)=> async(dispatch)=>{
    dispatch({type:CHAT_LOADING})
    try {
        const {data} = await api.createGroupAPI(from)
        dispatch({type:CREATE_GP_CHAT,payload:data})
        dispatch({type:END_CHAT_LOADING})
        navigate(`/${data._id}`, { replace: true });
    } catch (error) {
        dispatch({type:AUTH_ERROR,payload:error.response.data})
        dispatch({type:END_CHAT_LOADING})
    }
}


export const addUsersToGp = (formData,setSelectedUsers)=> async(dispatch)=>{
    dispatch({type:CHAT_LOADING})
    try {
        const {data} = await api.addUserAPI(formData)
        dispatch({type:ADD_USER_TO_GP,payload:data})
        dispatch({type:END_CHAT_LOADING})
        setSelectedUsers([]);
    } catch (error) {
        dispatch({type:AUTH_ERROR,payload:error.response.data})
        dispatch({type:CHAT_LOADING})
    }
}


export const removeUserFromGp = (formData)=> async(dispatch)=>{
    try {
        const {data} = await api.removeUserAPI(formData)
        dispatch({type:ADD_USER_TO_GP,payload:data})
    } catch (error) {
        dispatch({type:AUTH_ERROR,payload:error.response.data})
    }
}

export const changeGpName = (formData)=> async(dispatch)=>{
    try {
        const {data} = await api.changeGroupNameAPI(formData)
        dispatch({type:ADD_USER_TO_GP,payload:data})
    } catch (error) {
        dispatch({type:AUTH_ERROR,payload:error.response.data})
    }
}

export const deleteChat = (formData,navigate,socket,selectChat)=> async(dispatch)=>{
    dispatch({type:CHAT_LOADING})
    try {
        await api.deleteChatAPI(formData)
        socket.emit("delete chat", selectChat);
        dispatch({type:DELETE_CHAT})
        dispatch({type:END_CHAT_LOADING})
        navigate("/", { replace: true });
    } catch (error) {
        console.log(error);
        dispatch({type:AUTH_ERROR,payload:error.response.data})
        dispatch({type:END_CHAT_LOADING})
    }
}
