import * as actionTypes from "./actionTypes";
import axios from 'axios';

import { returnErrors } from './error';
import { clearErrors } from './error';

//Check token & load user
export const loadUser = () => (dispatch, getState) => {
    //User loading
    dispatch({ type: actionTypes.USER_LOADING});

    axios.get("/api/auth/user", tokenConfig(getState))
        .then(res => dispatch({
            type: actionTypes.USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: actionTypes.AUTH_ERROR
            })
        });
}

//Register new user
export const register = user => dispatch => {
    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //Request body
    const body = JSON.stringify(user);

    axios.post("/api/auth/register", body, config)
        .then(res => dispatch({
            type: actionTypes.REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "REGISTER_FAIL"));
            dispatch({
                type: actionTypes.REGISTER_FAIL
            });
        })
}

//Logout
export const logout = () => dispatch => {
    dispatch({
        type: actionTypes.LOGOUT_SUCCESS
    });
}

//Login
export const login = user => dispatch => {
    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //Request body
    const body = JSON.stringify(user);

    axios.post("/api/auth/login", body, config)
        .then(res => {
            dispatch(clearErrors());
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            if(err.response && err.response.data){
                dispatch(returnErrors(err.response.data, err.response.status, "LOGIN_FAIL"));
            }
            dispatch({
                type: actionTypes.LOGIN_FAIL
            });
        })
}

//Update pins
export const updatePinned = pinned => (dispatch, getState) => {
    //Request body
    const body = { pinned };
    
    axios.put("/api/auth/pinned", body, tokenConfig(getState))
        .then(res => dispatch({
            type: actionTypes.UPDATE_PINNED,
            user: res.data 
        }))
}

//Setup config/headers and token
export const tokenConfig = getState => {
    //Get token from localstorage
    const token = getState().auth.token;

    //Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // If token, add to headers
    if(token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}