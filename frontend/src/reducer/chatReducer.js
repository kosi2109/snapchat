import { ACCESS_CHAT, ADD_USER_TO_GP, CHAT_LOADING, CREATE_GP_CHAT, END_CHAT_LOADING, GET_CHATS, SELECT_CHAT } from "../constants/chatConstant";

export default (state = { chats: [], selectChat : null ,loading: false }, action) => {
  switch (action.type) {
    case GET_CHATS:
      return { ...state, chats: action.payload };
    case ACCESS_CHAT:
    case CREATE_GP_CHAT:
    case ADD_USER_TO_GP:
    case SELECT_CHAT:
      return { ...state, selectChat: action.payload };
    case CHAT_LOADING:
      return { ...state, loading: true };
    case END_CHAT_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};
