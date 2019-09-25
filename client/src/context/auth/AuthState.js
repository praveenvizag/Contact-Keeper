import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import axios from "axios";
import setAuthToken from './../../utils/setAuthToken';
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

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    user: null,
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  //load Users
  const loadUser = async () => {
    console.log('load user'); // to do load tokn on t headers
    if(localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('/api/auth');
      dispatch({
        type:USER_LOADED,
        payload:res.data
      })
    } catch (error) {
      dispatch({
        type:AUTH_ERROR
      })
    }
  }
  //Regiser User
  const register = async formData => {
    console.log("form Data", formData);
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/users", formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      loadUser();
    } catch (err) {
     console.log( 'err', err);
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };
  // Login User
  const login = async formData => {
    console.log("form Data", formData);
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/auth", formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      loadUser();
    } catch (err) {
     console.log( 'err', err);
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };
  //Log Out
  const logout = () => {
  dispatch({
    type:LOG_OUT
  })

  }

  //Clear Errors

  const clearError = () => {
    console.log('clear errors');
    dispatch({
      type:CLEAR_ERRORS
      
    })
  }
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearError
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
