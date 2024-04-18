import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

import LogoWhite from '../assets/images/white-logo.png';
import LoginImg from '../assets/images/login-img.png';

const Signup = () => {
    return (
        <div>
            <div className="login">
                <div className="login__container">
                    <div className="login__writeup">
                        <img src={LogoWhite} alt="Logo" className="login__writeup__logo"/>
                        <h2>Get started by signing up for a new account</h2>
                        <form>
                            <div className="flex flex-ai-c flex-jc-sb">
                                <div className="fl-container">
                                    <label for="firstname">
                                        Your first name
                                    </label>
                                    <div>
                                        <i className="bx bxs-id-card icon"></i>
                                        <input type="text" name="firstname" id="firstname" placeholder='Type your first name'/>
                                    </div>
                                </div>
                                <div className="fl-container">
                                    <label for="lastname">
                                        Your last name
                                    </label>
                                    <div>
                                        <i className="bx bxs-id-card icon"></i>
                                        <input type="text" name="lastname" id="lastname" placeholder="Type your last name"/>
                                    </div>
                                </div>
                            </div>
                            <label for="email">Your email address</label>
                            <div>
                                <i className="bx bxs-envelope icon"></i>
                                <input type="email" name="email" id="email" placeholder="Type your email"/>
                            </div>
                            <label for="password">Password</label>
                            <div>
                                <i className="bx bxs-key icon" ></i>
                                <input type="password" name="password" id="password" placeholder="Type your password"/>
                            </div>
                            <div className="login__writeup__submit_button">
                                <i className="bx bxs-log-in-circle icon"></i>
                                <input type="button" value="Sign Up"/>
                            </div>
                        </form>
                        <div className="login__writeup__link flex flex-ai-c">
                            <div>Already have an account? </div>
                            <Link to='/login'>click here</Link>
                        </div>
                    </div>
                    <div className="login__image">
                        {/* <img src="/images/login.png" alt=""> */}
                        <img src={LoginImg} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )   
}

export default Signup