import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Link, useNavigate, Navigate } from 'react-router-dom'

import SideNavbar from '../components/SideNavbar'
import Navbar from '../components/Navbar'

const NewQuiz = () => {
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [role, setRole] = useState(null);

    const getUserData = () => {
        axios.get('http://localhost:5000/api/v1/users/token')
        .then(res => {
          if (res.data.status === "Success") {
            setFirstName(res.data.first_name);
            setLastName(res.data.last_name);
            setRole(res.data.role);
          }
        })
        .catch(err => {
            console.log(err.message);
        });
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div>
                        <div className="dashboard">
                            <Navbar firstName={firstName} lastName={lastName} role={role}></Navbar>
                            <div className="dashboard__main">
                                <SideNavbar></SideNavbar>
                                <div className="dashboard__content" style={{display: "flex", flexDirection: "column"}}>
                                <div>
                                    <Link to='/quizzes' style={{textDecoration: 'none'}}>
                                        <button class="btn new-quiz" style={{width: '100px'}}>
                                            <i class='bx bx-arrow-back'></i>
                                            <h4>Back</h4>
                                        </button>
                                    </Link>
                                </div>
                                <div class="quizzes__content__item">
                                    {/* <div class="quizzes__upcoming__quizzes" style={{width: '800px'}}>
                                        <div class="quizzes__upcoming__quizzes__title">
                                            <h2>Data Structures</h2>
                                        </div>
                                        <div class="quizzes__upcoming__quizzes__datetime">
                                            <div>
                                                <i class='bx bxs-calendar' ></i>
                                                <p>12 / 03 / 2024</p>
                                            </div>
                                            <div>
                                                <i class='bx bxs-time-five' ></i>
                                                <p>09 : 00</p>
                                            </div>
                                        </div>
                                        <div class="quizzes__upcoming__quizzes__option__v1">
                                            <p>Duration</p>
                                            <p>30 minutes</p>
                                        </div>
                                        <div class="quizzes__upcoming__quizzes__option__v1">
                                            <p>Number of questions</p>
                                            <p>15</p>
                                        </div>
                                        <div class="quizzes__upcoming__quizzes__option__v1">
                                            <p>Score per question</p>
                                            <p>1</p>
                                        </div>
                                        <div class="quizzes__upcoming__quizzes__option__v2">
                                            <p>Description</p>
                                            <p>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
                                                rerum excepturi quam. Explicabo, voluptatum iusto maxime 
                                                velit porro, dolore libero perferendis ab ipsam exercitationem
                                                maiores, harum mollitia. A, voluptas ipsa.
                                            </p>
                                        </div>
                                        <div class="quizzes__upcoming__quizzes__button">
                                            <button>
                                                <i class='bx bxs-pencil' ></i>
                                                <p>Edit</p>
                                            </button>
                                        </div>
                                    </div> */}
                                    <div class="quizzes__upcoming__quizzes new__quiz" style={{width: '800px'}}>
                                        <form>
                                            <div className='new__quiz__title'>
                                                <h3>Set up a new quiz</h3>
                                            </div>
                                            <div className='new__quiz__inputs'>
                                                <div className='new__quiz__input'>
                                                    <div>Title: </div>
                                                    <input type="text" />
                                                </div>
                                                <div className='new__quiz__input'>
                                                    <div>Description: </div>
                                                    <input type="text" />
                                                </div>
                                                <div className='new__quiz__input'>
                                                    <div>Date: </div>
                                                    <input type="date" />
                                                </div>
                                                <div className='new__quiz__input'>
                                                    <div>Time: </div>
                                                    <input type="time" />
                                                </div>
                                                <div className='new__quiz__input'>
                                                    <div>Duration: </div>
                                                    <input type="text" />
                                                </div>
                                            </div>
                                            <div className="new__quiz__submit">
                                                    <i class='bx bx-check' ></i>
                                                    <input type="submit" value={"Submit"}/>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
    )
}

export default NewQuiz;