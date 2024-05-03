import { useEffect, useState } from "react";
import { Link, useNavigate, Navigate, useParams } from 'react-router-dom'
import axios from 'axios';

import Navbar from "../components/Navbar";
import SideNavbar from "../components/SideNavbar";

const MemberInfo = () => {
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [role, setRole] = useState(null);

    const navigate = useNavigate();

    const { id } = useParams();

    const [roles, setRoles] = useState(['admin', 'member', 'tutor']);

    const [userInfo, setUserInfo] = useState({
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        group_id: '',
    })

    const getMemberInfoById = () => {
        axios.get('http://localhost:5000/api/v1/users/get-user-info/'+id)
        .then(res => {
            setUserInfo({
                id: res.data.id,
                first_name: res.data.first_name,
                last_name: res.data.last_name,
                email: res.data.email,
                role: res.data.role,
                group_id: res.data.group_id
            });
        })
        .catch(err => {
            console.log(err);
        })
    };

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
    }

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
    
      const getGroupIdByName = (groupName) => {
        if (groupName === '-' || groupName == null) {
            return null;
        } else {
            const foundGroup = groups.find(group => group.name === groupName);
            return foundGroup ? foundGroup.id : null;
        }
    };
    

    const editUserInfo = () => {
        const values = userInfo;
        values.group_id = getGroupIdByName(values.group_id);
        axios.put('http://localhost:5000/api/v1/users/'+values.id, values)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const deleteUser = () => {
        const values = userInfo;
        console.log(values);
        axios.delete('http://localhost:5000/api/v1/users/'+values.id)
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
        getMemberInfoById();
        getUserData();
        getAllGroups();
    }, []);

    return (
        <div>
                        <div className="dashboard">
                            <Navbar firstName={firstName || ''} lastName={lastName || ''} role={role || ''}></Navbar>
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
                                    <div class="quizzes__upcoming__quizzes new__quiz member__info" style={{width: '800px'}}>
                                        <form>
                                            <div className='new__quiz__title'>
                                                <h3>Member informations</h3>
                                            </div>
                                            <div className='new__quiz__inputs'>
                                                <div className='new__quiz__input member__info__input'>
                                                    <div>First name:</div>
                                                    <input type="text" disabled={role == 'member' && role == 'tutor'} value={userInfo && userInfo.first_name} onChange={e => setUserInfo({...userInfo, first_name: e.target.value})} />
                                                </div>
                                                <div className='new__quiz__input member__info__input'>
                                                    <div>Last name:</div>
                                                    <input type="text" disabled={role == 'member' && role == 'tutor'} value={userInfo && userInfo.last_name} onChange={e => setUserInfo({...userInfo, last_name: e.target.value})} />
                                                </div>
                                                <div className='new__quiz__input member__info__input'>
                                                    <div>Email:</div>
                                                    <input type="text" disabled={role == 'member' && role == 'tutor'} value={userInfo && userInfo.email} onChange={e => setUserInfo({...userInfo, email: e.target.value})} />
                                                </div>
                                                <div className='new__quiz__input member__info__input'>
                                                    <div>Role:</div>
                                                    <select onChange={e => setUserInfo({...userInfo, role: e.target.value})}>
                                                    {
                                                        roles && roles.map(role => (
                                                        <option key={role} selected={role === userInfo?.role} >{role}</option>
                                                        ))
                                                    }
                                                    </select>
                                                </div>
                                                <div className='new__quiz__input member__info__input'>
                                                    <div>Group:</div>
                                                    <select onChange={e => setUserInfo({...userInfo, group_id: e.target.value})}>
                                                    <option>-</option>
                                                        {
                                                        groups && groups.map(group => (
                                                            <option key={group.id} selected={group.id === userInfo?.group_id} >{group.name}</option>
                                                        ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            {
                                                (role === 'admin') ?
                                                <div>
                                                    <div className="new__quiz__submit member__info__submit">
                                                        <div>
                                                            <i class='bx bxs-edit' ></i>
                                                            <input type="button" value={"Edit"} onClick={editUserInfo}/>
                                                        </div>
                                                        <div>
                                                            <i class='bx bxs-trash'></i>
                                                            <input type="button" value={"Delete"} onClick={deleteUser}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                null
                                            }
                                        </form>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
    )
}

export default MemberInfo;