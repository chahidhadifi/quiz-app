import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

import LogoWhite from '../assets/images/white-logo.png';
import LoginImg from '../assets/images/login-img.png';

const Signup = () => {
    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/v1/users/signup', values)
        .then(res => {
            if (res.data.status === "Success") {
                navigate('/login');
            } else if (res.data.error) {
                console.log(res.data.error);
            }
        })
        .catch(err => {
            console.log(err.message);
        });
    }

    return (
        <div>
            <div className="login">
                <div className="login__container">
                    <div className="login__writeup">
                        <img src={LogoWhite} alt="Logo" className="login__writeup__logo"/>
                        <h2>Get started by signing up for a new account</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-jc-sb">
                                <div className="fl-container">
                                    <label htmlFor="firstname">
                                        Your first name
                                    </label>
                                    <div>
                                        <i className="bx bxs-id-card icon"></i>
                                        <input type="text" name="firstname" id="firstname" placeholder='Type your first name' required onChange={e => setValues({...values, first_name: e.target.value})}/>
                                    </div>
                                </div>
                                <div className="fl-container">
                                    <label htmlFor="lastname">
                                        Your last name
                                    </label>
                                    <div>
                                        <i className="bx bxs-id-card icon"></i>
                                        <input type="text" name="lastname" id="lastname" required placeholder="Type your last name" onChange={e => setValues({...values, last_name: e.target.value})}/>
                                    </div>
                                </div>
                            </div>
                            <label htmlFor="email">Your email address</label>
                            <div>
                                <i className="bx bxs-envelope icon"></i>
                                <input type="email" name="email" id="email" required placeholder="Type your email" onChange={e => setValues({...values, email: e.target.value})}/>
                            </div>
                            <label htmlFor="password">Password</label>
                            <div>
                                <i className="bx bxs-key icon" ></i>
                                <input type="password" name="password" id="password" required placeholder="Type your password" onChange={e => setValues({...values, password: e.target.value})}/>
                            </div>
                            <div className="login__writeup__submit_button">
                                <i className="bx bxs-log-in-circle icon"></i>
                                <input type="submit" value="Sign Up"/>
                            </div>
                        </form>
                        <div className="login__writeup__link flex flex-ai-c">
                            <div>Already have an account? </div>
                            <Link to='/login'>click here</Link>
                        </div>
                    </div>
                    <div className="login__image">
                        <img src={LoginImg} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )   
}

export default Signup