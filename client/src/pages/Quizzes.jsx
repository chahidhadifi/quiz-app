import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Link, useNavigate, Navigate } from 'react-router-dom'

import SideNavbar from '../components/SideNavbar'
import Navbar from '../components/Navbar'

const Dashboard = () => {
    const [auth, setAuth] = useState(true);
    const [email, setEmail] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [userGroupId, setUserGroupId] = useState(null);
    const [role, setRole] = useState(null);

    const [users, setUsers] = useState(null);
    const [groups, setGroups] = useState(null);
    const [changedGroup, setChangedGroup] = useState({
        user_id: '',
        group_id: ''
    });
    const [roles, setRoles] = useState(['admin', 'member', 'tutor']);
    const [quizzesForAdmin, setQuizzesForAdmin] = useState(null);
    const [usersForAdmin, setUsersForAdmin] = useState(null);

    const [quizzesForMember, setQuizzesForMember] = useState(null);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [currentDateTime, setCurrentDateTime] = useState(null);
    const [completedQuizzes, setCompletedQuizzes] = useState(null);

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    // ! ---------------- Member page ---------------------
    const getUserData = () => {
        axios.get('http://localhost:5000/api/v1/users/token')
        .then(res => {
          if (res.data.status === "Success") {
            setEmail(res.data.email);
            setFirstName(res.data.first_name);
            setLastName(res.data.last_name);
            setAuth(true);
            setRole(res.data.role);
            setUserGroupId(res.data.group_id);
          } else if (res.data.error) {
            setAuth(false);
            navigate('/login');
          }
        })
        .catch(err => {
            console.log(err.message);
        });
    }
    // ! --------------------------------

    // ! ---------------- Admin page ---------------------
    const getAllQuizzesForAdmin = () => {
        axios.get('http://localhost:5000/api/v1/quiz/')
        .then(res => {
          setQuizzesForAdmin(res.data);
        })
        .catch(err => {
          console.log(err);
        })
    }

    const getAllGroups = () => {
        axios.get('http://localhost:5000/api/v1/groups')
        .then(res => {
          setGroups(res.data);
        })
        .catch(err => {
          console.log(err);
        })
    }

    const getAllUsers = () => {
        axios.get('http://localhost:5000/api/v1/users')
        .then(res => {
            setUsersForAdmin(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const changeGroupForAdmin = (event) => {
        const groupName = event.target.innerHTML;
        axios.get('http://localhost:5000/api/v1/users/usersbygroup', {
            params: {
              groupName: groupName
            }
          })
        .then(res => {
            setUsersForAdmin(res.data);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }
    // ! --------------------------------

    // ! ---------------- Globals ---------------------
    const getCurrentDateTime = async () => {
        await axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=hp9tRyiF3u0VdLZmUJsj42UPUdVub69fCJyZomvnzFP530-QlxW9QwjAPtF3J3uZ3ZyDelbM8Kj1ME-nqs-jWFGNbccenPQJm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJ9GRkcRevgjTvo8Dc32iw_BLJPcPfRdVKhJT5HNzQuXEeN3QFwl2n0M6ZmO-h7C6bwVq0tbM60-xIkq8d3Ts1lroRDJVNdycqbkuKKW-JKy&lib=MwxUjRcLr2qLlnVOLh12wSNkqcO1Ikdrk', {withCredentials: false})
        .then(res => {
          const { year, month, day, hours, minutes } = res.data;
          setCurrentDateTime(new Date(year, month-1, day, hours, minutes, 0));
        })
        .catch(err => {
          console.log(err);
        })
      }
    
      const createDateObjectWithDuration = (dateString, timeString, minutesToAdd) => {
        const [year, month, day] = dateString.split("-").map(Number);
        const [hour, minute] = timeString.split(":").map(Number);
        const dateObject = new Date(year, month - 1, day, hour, minute, 0);
        dateObject.setMinutes(dateObject.getMinutes() + minutesToAdd);
        return dateObject;
      }
    
      const createDateObject = (dateString, timeString) => {
        const [year, month, day] = dateString.split("-").map(Number);
        const [hour, minute] = timeString.split(":").map(Number);
        const dateObject = new Date(year, month - 1, day, hour, minute, 0);
        return dateObject;
      }
    
      const convertMinutesToTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(remainingMinutes).padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}`;
      }
    
    const getCompletedQuizzes = () => {
        axios.get('http://localhost:5000/api/v1/quiz/completed-quiz')
        .then(res => {
            setCompletedQuizzes(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    // ! --------------------------------

    useEffect(() => {
        //* globals
        getUserData();
        getAllGroups();

        //* admin
        getAllQuizzesForAdmin();
        getCurrentDateTime();
        getCompletedQuizzes();
    }, [currentDateTime, userGroupId]);

    return (
        <div>
            <div>
            {
                !auth ?
                <div>
                    <Navigate to='/login' replace={true} />
                </div>
                :
                null
            }
            </div>
            <div>
                {
                    (role=='admin') ?
                    <div>
                        <div className="dashboard">
                            <Navbar firstName={firstName} lastName={lastName} role={role}></Navbar>
                            <div className="dashboard__main">
                                <SideNavbar></SideNavbar>
                                <div className="dashboard__content" style={{display: "flex", flexDirection: "column"}}>
                                <div>
                                    <Link to='/new-quiz' style={{textDecoration: 'none'}}>
                                        <button class="btn new-quiz">
                                            <i class='bx bxs-add-to-queue'></i>
                                            <h4>New quiz</h4>
                                        </button>
                                    </Link>
                                </div>
                                <div class="quizzes__content__item">
                                    <div class="quizzes__upcoming__quizzes">
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
                                    </div>
                                    <div class="quizzes__upcoming__quizzes">
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
                                    </div>
                                    
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    (role=='member') ?
                    <div>This is member</div>
                    :
                    <div>This is tutor</div>
                }
            </div>
        </div>
    )
}

export default Dashboard;