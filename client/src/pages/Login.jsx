import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

import LogoWhite from "../assets/images/white-logo.png";
import LoginImage from "../assets/images/login-img.png";

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/v1/users/login', values)
        .then(res => {
            if (res.data.status === "Success") {
                navigate('/');
            } else if (res.data.error) {
                setError(res.data.error);
            }
        })
        .catch(err => {
            console.log(err.message);
        });
    }

    return (
        <>
            <div className="login">
                <div className="login__container">
                    <div className="login__writeup">
                        <img src={LogoWhite} alt="logo" className="login__writeup__logo"/>
                        <h2>Access your account by logging in below</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email">Registred email address</label>
                            <div>
                                <i className="bx bxs-envelope icon"></i>
                                <input required type="email" id="email" name="email" placeholder="Type your email" onChange={e => setValues({...values, email: e.target.value})}/>
                            </div>
                            <label htmlFor="password">Password</label>
                            <div>
                                <i className="bx bxs-key icon" ></i>
                                <input required type="password" name="password" id="password" placeholder="Type your password" onChange={e => setValues({...values, password: e.target.value})}/>
                            </div>
                            <div className="login__writeup__submit_button">
                                <i className="bx bxs-log-in-circle icon"></i>
                                <input type="submit" value={"Log In"}/>
                            </div>
                        </form>
                        <div className="login__writeup__link flex flex-ai-c">
                            <div>Don't have an account? </div>
                            <Link to="/signup">click here</Link>
                        </div>
                        {
                            error ?
                            <div className="alert alert-warning">
                                <i className='bx bxs-error'></i>
                                <p>{ error }</p>
                            </div>
                            :
                            null
                        }
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