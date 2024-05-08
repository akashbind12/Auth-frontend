// auth/api.js
import axios from 'axios';

// API call to signup
export const signupAPI = async (formData) => {
  try {
    const res = await axios.post('https://auth-backend-7pe5.onrender.com/api/auth/signup', formData);
    return res.data;
  } catch (error) {
    console.log("error:",error)
    throw error.response.data.error;
  }
};

// API call to login
export const loginAPI = async (formData) => {
  try {
    const res = await axios.post('https://auth-backend-7pe5.onrender.com/api/auth/login', formData);
    return res.data;
  } catch (error) {
    console.log("error:",error.response.data.error)
    throw error.response.data.error;
  }
};
