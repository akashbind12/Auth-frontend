// auth/reducer.js
import { LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_ERROR, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_ERROR, LOGOUT } from './types';
let token = localStorage.getItem('accessToken')
let user = localStorage.getItem('user')

const initialState = {
  isAuthenticated: token ? true : false,
  user: user ? JSON.parse(user) : null,
  accessToken: token || null,
  loginError: null,
  isLoginLoading: false,

  signupError: null,
  signupLoading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    //lOGIN ACTIONS
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoginLoading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        loginError: null,
        isLoginLoading: false
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginError: action.payload,
        isLoginLoading: false
      };

    //SIGNUP ACTIONS
    case SIGNUP_REQUEST:
      return {
        ...state,
        signupLoading: true
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupLoading: false
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        signupError: action.payload,
        signupLoading: false
      };

    //LOGOUT ACTION
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        accessToken: null,
        error: null
      };
    default:
      return state;
  }
};

export default authReducer;
