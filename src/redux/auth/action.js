// Import API functions
import { loginAPI, signupAPI } from './api';
import { LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_ERROR, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_ERROR, LOGOUT } from './types';
import { toast } from 'react-toastify';


// Login action
export const login = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const data = await loginAPI(formData); // Call loginAPI function
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    toast.success("Login successfully", {
      position: "top-center",
      autoClose: 1000,
    });
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('user', JSON.stringify(data.user));
    navigate('/');
  } catch (error) {
    dispatch({ type: LOGIN_ERROR, payload: error });
    toast.error(error, {
      position: "top-center",
      autoClose: 1000,
    });
  }
};

// signup action
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: SIGNUP_REQUEST });
    await signupAPI(formData); // Call loginAPI function
    dispatch({ type: SIGNUP_SUCCESS });
    toast.success("Register successfully", {
      position: "top-center",
      autoClose: 1000,
    });
    navigate('/login');
  } catch (error) {
    dispatch({ type: SIGNUP_ERROR, payload: error });
    toast.error(error, {
      position: "top-center",
      autoClose: 1000,
    });
  }
};


// Logout action
export const logout = () => ({ type: LOGOUT });
