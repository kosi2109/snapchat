import { DELETE_CHAT } from "../constants/chatConstant";
import { END_MESSAGE_LOADING, GET_MESSAGES, GET_NOTI, MESSAGE_LOADING, SENT_MESSAGE } from "../constants/messageConstant";

export default (state = { messages: [], loading: false , noti:null }, action) => {
    switch (action.type) {
      case DELETE_CHAT:
        return { ...state, messages: [] };
      case GET_MESSAGES:
        return { ...state, messages: action.payload };
      case SENT_MESSAGE:
        return { ...state, messages: [...state.messages,action.payload]};
      case GET_NOTI:
        return { ...state, noti: action.payload};
      case MESSAGE_LOADING:
        return { ...state, loading: true};
      case END_MESSAGE_LOADING:
        return { ...state, loading: false };
      default:
        return state;
    }
  };