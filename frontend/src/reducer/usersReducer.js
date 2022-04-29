import { END_USERS_LOADING, GET_USERS, USERS_LOADING } from "../constants/usersConstant";


export default (state = { users: [], loading: false, error: null }, action) => {
    switch (action.type) {
      case GET_USERS:
        return { ...state, users: action.payload };
      case USERS_LOADING:
        return { ...state, loading: true };
      case END_USERS_LOADING:
        return { ...state, loading: false };
      default:
        return state;
    }
  };