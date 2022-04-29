import { ACTIVE_USERS, AUTH_ERROR, AUTH_LOADING, CLEAR_ERR, END_AUTH_LOADING, LOGIN, UPDATE_PROFILE } from "../constants/authConstant";

export default (state = { user: JSON.parse(localStorage.getItem('snapchat_profile')), activeUsers : [] , loading: false, error: null },action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
    case LOGIN: {
      localStorage.setItem("snapchat_profile", JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    }
    case AUTH_ERROR: {
      return { ...state, error: action.payload.error };
    }
    case AUTH_LOADING: {
      return { ...state, loading: true };
    }
    case END_AUTH_LOADING: {
      return { ...state, loading: false };
    }
    case ACTIVE_USERS: {
      return { ...state, activeUsers: action.payload };
    }
    case CLEAR_ERR: {
      return { ...state, error: null };
    }
    default:
      return state;
  }
};
