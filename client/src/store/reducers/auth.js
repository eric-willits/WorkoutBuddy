import * as actionTypes from "../actions/actionTypes";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case(actionTypes.USER_LOADING) :
            return {
                ...state,
                isLoading: true
            }
        case(actionTypes.USER_LOADED) :
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case(actionTypes.LOGIN_SUCCESS) :
        case(actionTypes.REGISTER_SUCCESS) :
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            }
        case(actionTypes.LOGIN_FAIL) :
        case(actionTypes.AUTH_ERROR) :
        case(actionTypes.LOGOUT_SUCCESS) :
        case(actionTypes.REGISTER_FAIL) :
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        case(actionTypes.UPDATE_PINNED) :
            return {
                ...state,
                user: action.user
            }
        default: return state;
    }
}

export default reducer;