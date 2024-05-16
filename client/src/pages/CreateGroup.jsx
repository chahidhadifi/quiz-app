import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Link, useNavigate, Navigate } from 'react-router-dom'

import SideNavbar from '../components/SideNavbar'
import Navbar from '../components/Navbar'

const CreateGroup = () => {
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [role, setRole] = useState(null);

    const [values, setValues] = useState({
        name: ''
    });

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

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

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div>
                        <div className="dashboard">
                            <Navbar firstName={firstName} lastName={lastName} role={role}></Navbar>
                            <div className="dashboard__main">
                                <SideNavbar role={role}></SideNavbar>
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
                                                <h3>Create new group</h3>
                                            </div>
                                            <div className='new__quiz__inputs'>
                                                <div className='new__quiz__input'>
                                                    <div>Name: </div>
                                                    <input type="text" onChange={e => setValues({...values, name: e.target.value})}/>
                                                </div>
                                            </div>
                                            <div className="new__quiz__submit">
                                                    <i class='bx bxs-edit' ></i>
                                                    <input type="submit" value={"Submit"} onClick={createNewGroup}/>
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

export default CreateGroup;