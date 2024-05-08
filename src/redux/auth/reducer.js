// auth/reducer.js
import { LOGIN_SUCCESS, LOGOUT, AUTH_ERROR } from './types';
let token = localStorage.getItem('accessToken')
let user = localStorage.getItem('user')

const initialState = {
  isAuthenticated: token ? true : false,
  user: user ? JSON.parse(user): null,
  accessToken: token || null,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        error: null
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        accessToken: null,
        error: null
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
