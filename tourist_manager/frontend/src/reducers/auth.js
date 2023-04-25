import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN, LOGOUT_SUCCESS, REGISTER_SUCCESS, GET_USERS, DELETE_USER } from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: {},
    users: [],
    message: null,
    profile: null
}

export default function(state = initialState, action) {
    switch(action.type){
        case USER_LOADING:
            return{
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                isLoading:false,
                user: action.payload
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token)
            return{
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.user,
                message: action.payload.message,
                profile: action.payload.user.profile.account_type
            }
        case LOGIN_FAIL:

            localStorage.removeItem('token');
            if (action.payload.message === "Invalid Credentials") {
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                message:action.payload.message
            }
            } 
            else {
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                message:action.payload.message
            }
            }

        case LOGOUT_SUCCESS:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
         case REGISTER_SUCCESS:
            console.log(state.users)
            return{
                ...state,
                users: [...state.users, action.payload.user],
            };
         case GET_USERS:
            console.log(state.users)
            return{
                ...state,
                users: action.payload
                };

        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.payload),
                    };
        default:
            return state;
    }
}