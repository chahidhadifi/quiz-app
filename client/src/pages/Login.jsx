import React from "react";
import { Link } from "react-router-dom";

import LogoWhite from "../assets/images/white-logo.png";
import LoginImage from "../assets/images/login-img.png";

const Login = () => {
    return (
        <>
            <div className="login">
                <div className="login__container">
                    <div className="login__writeup">
                        <img src={LogoWhite} alt="logo" className="login__writeup__logo"/>
                        <h2>Access your account by logging in below</h2>
                        <form>
                            <label htmlFor="email">Registred email address</label>
                            <div>
                                <i className="bx bxs-envelope icon"></i>
                                <input type="email" id="email" name="email" placeholder="Type your email"/>
                            </div>
                            <label htmlFor="password">Password</label>
                            <div>
                                <i className="bx bxs-key icon" ></i>
                                <input type="password" name="password" id="password" placeholder="Type your password"/>
                            </div>
                            <div className="login__writeup__submit_button">
                                <i className="bx bxs-log-in-circle icon"></i>
                                <input type="button" value={"Log In"}/>
                            </div>
                        </form>
                        <div className="login__writeup__link flex flex-ai-c">
                            <div>Don't have an account? </div>
                            <Link to="/signup">click here</Link>
                        </div>
                    </div>
                    <div className="login__image">
                        <img src={LoginImage} alt="login-image" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login