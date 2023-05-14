import axios from "axios";
import { returnErrors } from './messages';

import {  USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL, RESET_REG_MESSAGE} from "./types";

export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};



export const login = (username, password) => async dispatch => {
  dispatch({ type: USER_LOADING });

  
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ username, password });
    const res = await axios.post('/api/auth/login', body, config);
    console.log(res.data.message)
    if(res.data.message === 'Success'){
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    }
    else {
      dispatch({
        type: LOGIN_FAIL,
        payload: res.data
      });
    }
    dispatch(loadUser());
 
};

export const logout = () => (dispatch, getState) => {
  axios
    .post('/api/auth/logout', null, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};


export const setRegister = (formData) => (dispatch, getState) => {
  // Create a new object with the desired structure
  const data = {
    username: formData.username,
    first_name: formData.first_name,
    last_name: formData.last_name,
    password: formData.password,
    profile: {
      account_type: formData.account_type,
      unhashed_pw: formData.password
    }
  };

  // Convert the new object to JSON
  const body = JSON.stringify(data);

  axios.post('/api/auth/register', body, tokenConfig(getState))
    .then(res => {
      if(res.data.message === 'Success'){
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data
        });
        }
        else {
          dispatch({
            type: REGISTER_FAIL,
            payload: res.data
          });
        }
    })
};
