// Import API functions
import { loginAPI } from './api';
import { LOGIN_SUCCESS, AUTH_ERROR , LOGOUT } from './types';
import { toast } from 'react-toastify';


// Login action
export const login = (formData,navigate) => async (dispatch) => {
  try {
    const data = await loginAPI(formData); // Call loginAPI function
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    toast.success("Login successfully", {
      position: "top-center",
      autoClose: 1000,
    });
    navigate('/');
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error });
    toast.error(error, {
      position: "top-center",
      autoClose: 1000,
    });
  }
};


// Logout action
export const logout = () => ({ type: LOGOUT });
