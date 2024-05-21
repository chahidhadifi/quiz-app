import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Link, useNavigate, Navigate } from 'react-router-dom'

import UserImg from '../assets/images/user-img.png'
import QuizImg from '../assets/images/quiz-img.png'

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
        //   setQuizzes(res.data);
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
        // axios.get('http://localhost:5000/api/v1/users/usersbygroup', {
        //     params: {
        //       groupName: groupName
        //     }
        //   })
        // .then(res => {
        //     setUsersForAdmin(res.data);
        //     console.log(res.data);
        // })
        // .catch(err => {
        //     console.log(err);
        // })
        if (groupName == 'All') {
            getAllUsers();
        } else {
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

    // const handleLogout = () => {
    //     axios.get('http://localhost:5000/api/v1/users/logout')
    //     .then(res => {
    //       location.reload(true);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     })
    // }
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

    useEffect(() => {
        getAllUsers();
    }, []);

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
            <div>
                        <div className="dashboard">
                            <Navbar firstName={firstName} lastName={lastName} role={role} ></Navbar>
                            <div className="dashboard__main">
                                <SideNavbar role={role}></SideNavbar>
                                    {
                                        (role=='admin') ?
                                        <div className='dashboard__content' >
                                            <div className="dashboard__content__item">
                                            <div className="dashboard__upcoming__quizzes scrollbar-upcoming-quizzes" style={{ overflowY: 'scroll' }} id="style-3">
                                                <div className="dashboard__upcoming__quizzes__title">
                                                    <h3>Upcoming quizzes</h3>
                                                    <div>
                                                        <Link className='link' to="/quizzes"><h5>Quiz directory</h5></Link>
                                                        <i className='bx bx-right-arrow-alt' ></i>
                                                    </div>
                                                </div>
                                                {
                                                    (quizzesForAdmin && quizzesForAdmin==0) ?
                                                    <div className='flex flex-fd-r flex-ai-c'>
                                                            <i class='bx bxs-error-circle' style={{color: '#ECA8A8', marginRight: '10px'}}></i>
                                                            <h2>No quiz available at this time</h2>
                                                    </div>
                                                    :
                                                    quizzesForAdmin && quizzesForAdmin.map(quiz => (
                                                        <div className="flex flex-ai-c dashboard__upcoming__quizzes__item" key={quiz.id}>
                                                            <img src={QuizImg} alt=""/>
                                                            <div>
                                                                <h4>{ quiz.title }</h4>
                                                                <p>{ quiz.date + " - " + quiz.time }</p>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            <div className="dashboard__completed_quizzes scrollbar-completed-quizzes" style={{ overflowY: 'scroll' }} id="style-3">
                                                <div className="dashboard__completed_quizzes__title">
                                                    <h3>Completed quizzes</h3>
                                                </div>
                                                <div className="dashboard__completed_quizzes__table">
                                                    <table>
                                                        <tr>
                                                            <th>Title</th>
                                                            <th>Group name</th>
                                                            <th>No. of persons in group</th>
                                                            <th>Date</th>
                                                        </tr>
                                                        {
                                                            completedQuizzes && completedQuizzes.map(quiz => (
                                                                <tr key={ quiz.id }>
                                                                    <td>{ quiz.title }</td>
                                                                    <td>{ quiz.name }</td>
                                                                    <td>{ quiz.user_count } persons</td>
                                                                    <td>{ quiz.date }</td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dashboard__content__item">
                                            <div className="dashboard__members_list scrollbar" style={{ overflowY: 'scroll' }} id="style-3">
                                                <div className="dashboard__members_list__title">
                                                    <h3>Members list</h3>
                                                    <div>
                                                        <Link className='link' to="/members"><h5>Members directory</h5></Link>
                                                        <i className='bx bx-right-arrow-alt' ></i>
                                                    </div>
                                                </div>
                                                <div className="dashboard__members_list__groups">
                                                    <button onClick={changeGroupForAdmin}>All</button>
                                                    {
                                                        groups && groups.map(group => (
                                                            <button key={group.id} style={{textTransform: 'capitalize'}} onClick={changeGroupForAdmin}>{ group.name }</button>
                                                        ))
                                                    }
                                                </div>
                                                {
                                                    usersForAdmin && usersForAdmin.map(user => (
                                                        <div className="dashboard__members_list__item" key={user.id}>
                                                            <img src={UserImg} alt=""/>
                                                            <div className="dashboard__members_list__item__name">
                                                                <div>
                                                                    <h4 style={{textTransform: 'capitalize'}} >{ user.first_name+' '+user.last_name }</h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        </div>
                                        :
                                        (role=='member') ?
                                        <div className='dashboard__content' >
                                            <div className="dashboard__content__item">
                                            <div className="dashboard__upcoming__quizzes scrollbar-upcoming-quizzes" style={{ overflowY: 'scroll' }} id="style-3">
                                                <div className="dashboard__upcoming__quizzes__title">
                                                    <h3>Upcoming quizzes</h3>
                                                    <div>
                                                        <Link className='link' to="/quizzes"><h5>Quiz directory</h5></Link>
                                                        <i className='bx bx-right-arrow-alt' ></i>
                                                    </div>
                                                </div>
                                                {
                                                    (quizzesForAdmin && quizzesForAdmin.length==0) ?
                                                    <div className='flex flex-fd-r flex-ai-c'>
                                                        <i class='bx bxs-error-circle' style={{color: '#ECA8A8', marginRight: '10px'}}></i>
                                                        <h2>No quiz available at this time</h2>
                                                    </div>
                                                    :
                                                    quizzesForAdmin && quizzesForAdmin.map(quiz => (
                                                        (quiz.group_id == userGroupId) ?
                                                        <div className="flex flex-ai-c dashboard__upcoming__quizzes__item" key={quiz.id}>
                                                            <img src={QuizImg} alt=""/>
                                                            <div>
                                                                <h4>{ quiz.title }</h4>
                                                                <p>{ quiz.date + " - " + quiz.time }</p>
                                                            </div>
                                                        </div>
                                                        :
                                                        null
                                                    ))
                                                }
                                            </div>
                                            
                                        </div>
                                        <div className='dashboard__content__item'>
                                        <div className="dashboard__completed_quizzes scrollbar-completed-quizzes" style={{ overflowY: 'scroll' }} id="style-3">
                                                <div className="dashboard__completed_quizzes__title">
                                                    <h3>Completed quizzes</h3>
                                                </div>
                                                <div className="dashboard__completed_quizzes__table">
                                                    <table>
                                                        <tr>
                                                            <th>Title</th>
                                                            <th>Group name</th>
                                                            <th>No. of persons in group</th>
                                                            <th>Date</th>
                                                        </tr>
                                                        {
                                                            completedQuizzes && completedQuizzes.map(quiz => (
                                                                <tr key={ quiz.id }>
                                                                    <td>{ quiz.title }</td>
                                                                    <td>{ quiz.name }</td>
                                                                    <td>{ quiz.user_count } persons</td>
                                                                    <td>{ quiz.date }</td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                        :
                                        <div className='dashboard__content' >
                                            <div className="dashboard__content__item">
                                            <div className="dashboard__upcoming__quizzes scrollbar-upcoming-quizzes" style={{ overflowY: 'scroll' }} id="style-3">
                                                <div className="dashboard__upcoming__quizzes__title">
                                                    <h3>Upcoming quizzes</h3>
                                                    <div>
                                                        <Link className='link' to="/quizzes"><h5>Quiz directory</h5></Link>
                                                        <i className='bx bx-right-arrow-alt' ></i>
                                                    </div>
                                                </div>
                                                {
                                                    (quizzesForAdmin && quizzesForAdmin==0) ?
                                                    <div className='flex flex-fd-r flex-ai-c'>
                                                            <i class='bx bxs-error-circle' style={{color: '#ECA8A8', marginRight: '10px'}}></i>
                                                            <h2>No quiz available at this time</h2>
                                                    </div>
                                                    :
                                                    quizzesForAdmin && quizzesForAdmin.map(quiz => (
                                                        <div className="flex flex-ai-c dashboard__upcoming__quizzes__item" key={quiz.id}>
                                                            <img src={QuizImg} alt=""/>
                                                            <div>
                                                                <h4>{ quiz.title }</h4>
                                                                <p>{ quiz.date + " - " + quiz.time }</p>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            <div className="dashboard__completed_quizzes scrollbar-completed-quizzes" style={{ overflowY: 'scroll' }} id="style-3">
                                                <div className="dashboard__completed_quizzes__title">
                                                    <h3>Completed quizzes</h3>
                                                </div>
                                                <div className="dashboard__completed_quizzes__table">
                                                    <table>
                                                        <tr>
                                                            <th>Title</th>
                                                            <th>Group name</th>
                                                            <th>No. of persons in group</th>
                                                            <th>Date</th>
                                                        </tr>
                                                        {
                                                            completedQuizzes && completedQuizzes.map(quiz => (
                                                                <tr key={ quiz.id }>
                                                                    <td>{ quiz.title }</td>
                                                                    <td>{ quiz.name }</td>
                                                                    <td>{ quiz.user_count } persons</td>
                                                                    <td>{ quiz.date }</td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dashboard__content__item">
                                            <div className="dashboard__members_list scrollbar" style={{ overflowY: 'scroll' }} id="style-3">
                                                <div className="dashboard__members_list__title">
                                                    <h3>Members list</h3>
                                                </div>
                                                <div className="dashboard__members_list__groups">
                                                    <button onClick={changeGroupForAdmin}>All</button>
                                                    {
                                                        groups && groups.map(group => (
                                                            <button key={group.id} style={{textTransform: 'capitalize'}} onClick={changeGroupForAdmin}>{ group.name }</button>
                                                        ))
                                                    }
                                                </div>
                                                {
                                                    usersForAdmin && usersForAdmin.map(user => (
                                                        <div className="dashboard__members_list__item" key={user.id}>
                                                            <img src={UserImg} alt=""/>
                                                            <div className="dashboard__members_list__item__name">
                                                                <div>
                                                                    <h4 style={{textTransform: 'capitalize'}} >{ user.first_name+' '+user.last_name }</h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        </div>
                                    }
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Dashboard;