import * as api from "../api"
import { AUTH_ERROR } from "../constants/authConstant";
import { GET_USERS , USERS_LOADING , END_USERS_LOADING} from "../constants/usersConstant";



export const getUsers = (keyword)=> async(dispatch)=>{
    try {
        dispatch({type:USERS_LOADING})
        const {data} = await api.userSearchAPI(keyword)
        dispatch({type:GET_USERS,payload:data})
        dispatch({type:END_USERS_LOADING})
    } catch (error) {
        dispatch({type:AUTH_ERROR,payload:error.response.data})
    }
}