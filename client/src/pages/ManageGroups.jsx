import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Link, useNavigate, Navigate } from 'react-router-dom'

import SideNavbar from '../components/SideNavbar'
import Navbar from '../components/Navbar'

const ManageGroups = () => {
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [role, setRole] = useState(null);

    const [values, setValues] = useState({
        name: ''
    });

    const [groupName, setGroupName] = useState({
        name: ''
    })

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

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

    const createNewGroup = () => {
        axios.post('http://localhost:5000/api/v1/groups', values)
        .then(res => {
            if (res.statusText == 'OK') {
                navigate('/members');
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    const editGroup = () => {
        const id = getGroupIdByName(groupName.name.toString());
        axios.put('http://localhost:5000/api/v1/groups/'+id, values)
        .then(res => {
            if (res.statusText === 'OK') {
                navigate('/members');
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    const deleteGroup = () => {
        const id = getGroupIdByName(groupName.name);
        axios.delete('http://localhost:5000/api/v1/groups/'+id)
        .then(res => {
            if (res.statusText == 'OK') {
                navigate('/members');
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    const displayGroupNameInInput = (event) => {
        if (event.target.value === '-') {
            setGroupName({
                name: ''
            })
        } else {
            setGroupName({
                name: event.target.value
            })
        }
    }

    const getGroupIdByName = (groupName) => {
        if (groupName == '-') {
            return null;
        } else {
            const foundGroup = groups.find(group => group.name == groupName);
            return foundGroup ? foundGroup.id : null;
        }
    };

    useEffect(() => {
        getUserData();
        getAllGroups();
    }, []);

    return (
        <div>
                        <div className="dashboard">
                            <Navbar firstName={firstName} lastName={lastName} role={role}></Navbar>
                            <div className="dashboard__main">
                                <SideNavbar></SideNavbar>
                                <div className="dashboard__content" style={{display: "flex", flexDirection: "column"}}>
                                <div>
                                    <Link to='/members' style={{textDecoration: 'none'}}>
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
                                                <h3>Choose a group from the list</h3>
                                            </div>
                                            <div className='new__quiz__inputs'>
                                                <div className='new__quiz__input select'>
                                                    <div style={{width: '200px'}}>List of groups: </div>
                                                    <select onChange={displayGroupNameInInput}>
                                                        <option>-</option>
                                                        {
                                                            groups && groups.map(group => (
                                                                <option key={group.id}>{group.name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                <div className='new__quiz__input'>
                                                    <div>Name: </div>
                                                    <input type="text" value={values.name} onChange={e => { setValues({...values, name: e.target.value})}}/>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="new__quiz__submit member__info__submit">
                                                        <div>
                                                            <i class='bx bxs-edit' ></i>
                                                            <input className='btnn' type="button" value={"Edit"} onClick={editGroup}/>
                                                        </div>
                                                        <div>
                                                            <i class='bx bxs-trash'></i>
                                                            <input className='btnn' type="button" value={"Delete"} onClick={deleteGroup}/>
                                                        </div>
                                                    </div>
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

export default ManageGroups;