import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import SideNavbar from "../components/SideNavbar";

const EditQuiz = () => {
    const { id } = useParams();

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [role, setRole] = useState(null);

    const [quizInfo, setQuizInfo] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        duration: '',
        group_id: ''
    });

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const getQuizInfoById = () => {
        if (id == null) {
            navigate('/quizzes');
        }
        axios.get('http://localhost:5000/api/v1/quiz/get-quiz-info/'+id)
        .then(res => {
            setQuizInfo({
                title: res.data.title,
                description: res.data.description,
                date: res.data.date,
                time: res.data.time,
                duration: minutesToHHMM(res.data.duration),
                group_id: res.data.group_id
            })
        })
        .catch(err => {
            console.log(err);
        })
    };

    const getUserData = () => {
        axios.get('http://localhost:5000/api/v1/users/token')
        .then(res => {
          if (res.data.status === "Success") {
            setFirstName(res.data.first_name);
            setLastName(res.data.last_name);
            setRole(res.data.role);
          } else if (res.data.error) {
            setAuth(false);
          }
        })
        .catch(err => {
            console.log(err.message);
        });
    }

    const minutesToHHMM = (minutes) => {
        var hours = Math.floor(minutes / 60);
        var remainingMinutes = minutes % 60;
        var hoursStr = hours < 10 ? '0' + hours : hours.toString();
        var minutesStr = remainingMinutes < 10 ? '0' + remainingMinutes : remainingMinutes.toString();
        return hoursStr + ':' + minutesStr;
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
    
    const timeToMinutes = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes;
        return totalMinutes;
    } 

    const getGroupIdByName = (groupName) => {
        if (groupName == 'All groups') {
            return null;
        } else {
            const foundGroup = groups.find(group => group.name == groupName);
            return foundGroup ? foundGroup.id : null;
        }
    };
    
    const editQuiz = () => {
        const values = quizInfo;
        values.duration = timeToMinutes(quizInfo.duration);
        values.group_id = getGroupIdByName(quizInfo.group_id);
        axios.put('http://localhost:5000/api/v1/quiz/'+id, values)
        .then(res => {
            if (res.statusText === 'OK')
                navigate('/quizzes');
        })
        .catch(err => {
            console.log(err);
        })
    }

    const deleteQuiz = () => {
        axios.delete('http://localhost:5000/api/v1/quiz/' + id)
        .then(res => {
            if (res.statusText === 'OK') {
                navigate('/quizzes');
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getQuizInfoById();
        getAllGroups();
        getUserData();
    }, []);

    return (
        <div>
                        <div className="dashboard">
                            <Navbar firstName={firstName || ''} lastName={lastName || ''} role={role || ''}></Navbar>
                            <div className="dashboard__main">
                                <SideNavbar role={role}></SideNavbar>
                                <div className="dashboard__content" style={{display: "flex", flexDirection: "column"}}>
                                <div>
                                    <Link to='/quizzes' style={{textDecoration: 'none'}}>
                                        <button class="btn new-quiz" style={{width: '100px'}}>
                                            <i class='bx bx-arrow-back'></i>
                                            <h4>Back</h4>
                                        </button>
                                    </Link>
                                    <Link to={'/quizzes/add-questions/'+id} style={{textDecoration: 'none'}}>
                                        <button class="btn new-quiz" style={{width: '160px'}}>
                                            <i class='bx bx-list-plus'></i>
                                            <h4>Add questions</h4>
                                        </button>
                                    </Link>
                                </div>
                                <div class="quizzes__content__item">
                                    <div class="quizzes__upcoming__quizzes new__quiz member__info" style={{width: '800px'}}>
                                        <form>
                                            <div className='new__quiz__title'>
                                                <h3>Quiz informations</h3>
                                            </div>
                                            <div className='new__quiz__inputs'>
                                                <div className='new__quiz__input member__info__input'>
                                                    <div>Title:</div>
                                                    <input type="text" value={quizInfo && quizInfo.title} onChange={e => setQuizInfo({...quizInfo, title: e.target.value})} />
                                                </div>
                                                <div className='new__quiz__input member__info__input'>
                                                    <div>Description:</div>
                                                    <input type="text" value={quizInfo && quizInfo.description} onChange={e => setQuizInfo({...quizInfo, description: e.target.value})} />
                                                </div>
                                                <div className='new__quiz__input member__info__input'>
                                                    <div>Date:</div>
                                                    <input type="date" value={quizInfo && quizInfo.date} onChange={e => setQuizInfo({...quizInfo, date: e.target.value})} />
                                                </div>
                                                <div className='new__quiz__input member__info__input'>
                                                    <div>Time:</div>
                                                    <input type="time" value={quizInfo && quizInfo.time} onChange={e => setQuizInfo({...quizInfo, time: e.target.value})} />
                                                </div>
                                                <div className='new__quiz__input member__info__input'>
                                                    <div style={{width: '240px'}}>Duration (HH:MM):</div>
                                                    <input type="time" value={quizInfo && quizInfo.duration} onChange={e => setQuizInfo({...quizInfo, duration: e.target.value})} />
                                                </div>
                                                <div className='new__quiz__input member__info__input'>
                                                    <div>Group:</div>
                                                    <select onChange={e => setQuizInfo({...quizInfo, group_id: e.target.value})}>
                                                    <option>All groups</option>
                                                        {
                                                        groups && groups.map(group => (
                                                            <option key={group.id} selected={group.id === quizInfo?.group_id} >{group.name}</option>
                                                        ))
                                                        }
                                                    </select>
                                                </div>
                                                <div>
                                                    <div className="new__quiz__submit member__info__submit">
                                                        <div>
                                                            <i class='bx bxs-edit' ></i>
                                                            <input type="button" value={"Edit"} onClick={editQuiz}/>
                                                        </div>
                                                        <div>
                                                            <i class='bx bxs-trash'></i>
                                                            <input type="button" value={"Delete"} onClick={deleteQuiz}/>
                                                        </div>
                                                    </div>
                                                </div>
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

export default EditQuiz;