import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../css/Home.css";
import { logout } from "../redux/auth/action";

const Home = () => {
    const authState = useSelector(state => state.auth);
    console.log(authState)
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout()); // Dispatch the logout action
        localStorage.removeItem('accessToken'); 
        localStorage.removeItem('user'); 
    };

    return (
        <>
            {
                authState.isAuthenticated ?
                    <div>
                        <div className="token-container">
                            Token : {authState.accessToken}
                        </div>
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </div> 
                    :
                    <div className="home-container">
                        <h1>Welcome to the Home page</h1>
                        <div className="button-container">
                            <Link to="/signup">
                                <button className="signup-button">Signup</button>
                            </Link>
                            <Link to="/login">
                                <button className="login-button">Login</button>
                            </Link>
                        </div>
                    </div>
            }
        </>
    );
};

export default Home;
