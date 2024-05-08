import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../css/Home.css"

const Home = () => {

    const authState = useSelector(state => state.auth);

    return (
        <>
            {
                authState.isAuthenticated ?
                    <div className="token-container">Token : {authState.accessToken}
                    </div> :
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
