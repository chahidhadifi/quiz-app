import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Link, useNavigate, Navigate } from 'react-router-dom'

import UserImg from '../assets/images/user-img.png'
import QuizImg from '../assets/images/quiz-img.png'

import SideNavbar from '../components/SideNavbar'
import Navbar from '../components/Navbar'

const Members = () => {
    const [auth, setAuth] = useState(true);
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

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const getUserData = () => {
        axios.get('http://localhost:5000/api/v1/users/token')
        .then(res => {
          if (res.data.status === "Success") {
            setFirstName(res.data.first_name);
            setLastName(res.data.last_name);
            setAuth(true);
            setRole(res.data.role);
          } else if (res.data.error) {
            setAuth(false);
            navigate('/login');
          }
        })
        .catch(err => {
            console.log(err.message);
        });
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

    const [memberInfoId, setMemberInfoId] = useState(null);

    const getMemberInfo = (event) => {
        const memberId = event.target.closest('.dashboard__members_list__item').querySelector('h4').innerText[0];
        setMemberInfoId(memberId);
    }

    useEffect(() => {
        getUserData();
        getAllGroups();
        getAllUsers();
    }, [])
    
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
                            <Navbar firstName={firstName} lastName={lastName} role={role} ></Navbar>
                            <div className="dashboard__main">
                                <SideNavbar role={role}></SideNavbar>
                                <div className="dashboard__content members__content flex-fd-c">
                                    <div className='members__content__links'>
                                        <Link to='/create-group' style={{textDecoration: 'none'}}>
                                            <button class="btn members__content__btn" style={{width: '100px'}}>
                                                <i class='bx bxs-group'></i>
                                                <h4>Create group</h4>
                                            </button>
                                        </Link>
                                        <Link to='/manage-groups' style={{textDecoration: 'none'}}>
                                            <button class="btn members__content__btn" style={{width: '100px'}}>
                                                <i class='bx bxs-edit-alt' ></i>
                                                <h4>Manage groups</h4>
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="dashboard__content__item members__content__container">
                                        <div className="dashboard__members_list scrollbar" style={{ overflowY: 'scroll', width: '700px' }} id="style-3">
                                            <div className="dashboard__members_list__title">
                                                <h3>Members list</h3>
                                            </div>
                                            <div className="dashboard__members_list__groups">
                                                <button onClick={getAllUsers}>All</button>
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
                                                                <h4 style={{textTransform: 'capitalize'}} className='name' >{ user.id+' - '+user.first_name+' '+user.last_name }</h4>
                                                            </div>
                                                            <div>
                                                                <Link to={'/members/member-info/'+memberInfoId} className='link'><i className='bx bxs-right-arrow-circle' onMouseEnter={getMemberInfo} onTouchStart={getMemberInfo}></i></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    (role=='member') ?
                    <div>
                        <Navigate to='/page-not-found' replace={true} />
                    </div>
                    :
                    <div>This is tutor</div>
                }
            </div>
        </div>
    )
}

export default Members;