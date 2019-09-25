import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOG_OUT,
  USER_LOADED,
  CLEAR_ERRORS,
  AUTH_ERROR
} from "../types";
export default (state, action) => {
  console.log(
    action.type,
    "auth state Reducer",
    state,
    "auth payload",
    action.payload
  );
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOG_OUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
        user: null
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    default:
      return state;
  }
};
