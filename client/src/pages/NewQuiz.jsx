import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Link, useNavigate, Navigate } from 'react-router-dom'

import SideNavbar from '../components/SideNavbar'
import Navbar from '../components/Navbar'

const NewQuiz = () => {
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [role, setRole] = useState(null);

    const [values, setValues] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        duration: '',
        group_id: ''
    });

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const [groups, setGroups] = useState(null);

    const getAllGroups = () => {
        axios.get('http://localhost:5000/api/v1/groups')
        .then(res => {
          setGroups(res.data);
        })
        .catch(err => {
          console.log(err);
        })
    }

    const getUserData = () => {
        axios.get('http://localhost:5000/api/v1/users/token')
        .then(res => {
          if (res.data.status === "Success") {
            setFirstName(res.data.first_name);
            setLastName(res.data.last_name);
            setRole(res.data.role);
          } else if (res.data.error) {
            navigate('/login');
          }
        })
        .catch(err => {
            console.log(err.message);
        });
    };

    const timeToMinutes = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes;
        return totalMinutes;
    }    

    const getGroupIdByName = (groupName) => {
        if (groupName == '-') {
            return null;
        } else {
            const foundGroup = groups.find(group => group.name == groupName);
            return foundGroup ? foundGroup.id : null;
        }
    };

    const createNewQuiz = () => {
        const totalMinutes = timeToMinutes(values.duration);
        let groupId = null;
        if (values.group_id == null || values.group_id == 'All groups') {
            groupId = null;
        } else {
            groupId = getGroupIdByName(values.group_id);
        }
        const updatedValues = {
            ...values,
            duration: totalMinutes.toString(),
            group_id: groupId
        };
        setValues(updatedValues);
        axios.post('http://localhost:5000/api/v1/quiz', updatedValues)
            .then(res => {
                if (res.statusText === 'OK') {
                    navigate('/quizzes');
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    

    useEffect(() => {
        getUserData();
        getAllGroups();
        console.log(timeToMinutes('01:30'));
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
                                    <div class="quizzes__upcoming__quizzes new__quiz" style={{width: '800px'}}>
                                        <div>
                                            <div className='new__quiz__title'>
                                                <h3>Set up a new quiz</h3>
                                            </div>
                                            <div className='new__quiz__inputs'>
                                                <div className='new__quiz__input'>
                                                    <div>Title: </div>
                                                    <input type="text" onChange={e => setValues({...values, title: e.target.value})} />
                                                </div>
                                                <div className='new__quiz__input'>
                                                    <div>Description: </div>
                                                    <input type="text" onChange={e => setValues({...values, description: e.target.value})} />
                                                </div>
                                                <div className='new__quiz__input'>
                                                    <div>Date: </div>
                                                    <input type="date" onChange={e => setValues({...values, date: e.target.value})} />
                                                </div>
                                                <div className='new__quiz__input'>
                                                    <div>Time: </div>
                                                    <input type="time" onChange={e => setValues({...values, time: e.target.value})} />
                                                </div>
                                                <div className='new__quiz__input'>
                                                    <div>Duration: </div>
                                                    <input type="time" onChange={e => setValues({...values, duration: e.target.value})} />
                                                </div>
                                                <div className='new__quiz__input select'>
                                                    <div>Group: </div>
                                                    <select style={{marginLeft: '10px'}} onChange={e => setValues({...values, group_id: e.target.value})}>
                                                        <option>All groups</option>
                                                        {
                                                            groups && groups.map(group => (
                                                                <option key={group.id}>{group.name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="new__quiz__submit">
                                                    <i class='bx bxs-edit' ></i>
                                                    <button className='btnn' value={"Submit"} onClick={createNewQuiz}>Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
    )
}

export default NewQuiz;