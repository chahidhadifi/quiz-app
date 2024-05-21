import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import SideNavbar from "../components/SideNavbar";

const AddQuestions = () => {
    const { id } = useParams();

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [role, setRole] = useState(null);

    const [questionInfo, setQuestionInfo] = useState({
        title: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        answer: '',
        quiz_id: id
    });

    const [questionCreatedInfo, setQuestionCreatedInfo] = useState({
        title: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        answer: '',
        quiz_id: id
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
          } else if (res.data.error) {
            setAuth(false);
          }
        })
        .catch(err => {
            console.log(err.message);
        });
    }

    const [groups, setGroups] = useState(null);

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

    const [questions, setQuestions] = useState(null);

    const getQuizInfoById = () => {
        axios.get('http://localhost:5000/api/v1/questions/get-question-by-quiz-id/'+id)
        .then(res => {
            setQuestionInfo({
                title: res.data.title,
                option_a: res.data.option_a,
                option_b: res.data.option_b,
                option_c: res.data.option_c,
                option_d: res.data.option_d,
                answer: res.data.answer,
                quiz_id: res.data.quiz_id
            });
            setQuestions(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const addNewQuestion = () => {
        console.log(questionCreatedInfo);
    }

    useEffect(() => {
        getQuizInfoById();
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
                                </div>
                                <div class="quizzes__content__item flex-fd-c">
                                    <div class="quizzes__upcoming__quizzes new__quiz member__info" style={{width: '800px'}}>
                                        <form>
                                            <div className='new__quiz__title'>
                                                <h3>Add question to quiz</h3>
                                            </div>
                                            <div className='new__quiz__inputs'>
                                                <div className='new__quiz__input member__info__input'>
                                                    <div>Title:</div>
                                                    <input type="text" onChange={e => setQuestionCreatedInfo({...questionCreatedInfo , title: e.target.value})} />
                                                </div>
                                                <div className='new__quiz__input member__info__input'>
                                                    <div>Option 1:</div>
                                                    <input type="text"  onChange={e => setQuestionCreatedInfo({...questionCreatedInfo, option_a: e.target.value})} />
                                                </div>
                                                <div className='new__quiz__input member__info__input'>
                                                    <div>Option 2:</div>
                                                    <input type="text" onChange={e => setQuestionCreatedInfo({...questionCreatedInfo, option_b: e.target.value})} />
                                                </div>
                                                <div className='new__quiz__input member__info__input'>
                                                    <div>Option 3:</div>
                                                    <input type="text" onChange={e => setQuestionCreatedInfo({...questionCreatedInfo, option_c: e.target.value})} />
                                                </div>
                                                <div className='new__quiz__input member__info__input'>
                                                    <div>Option 4:</div>
                                                    <input type="text" onChange={e => setQuestionCreatedInfo({...questionCreatedInfo, option_d: e.target.value})} />
                                                </div>
                                                <div className='new__quiz__input member__info__input'>
                                                    <div>Answer:</div>
                                                    <select onChange={e => setQuestionCreatedInfo({...questionCreatedInfo, answer: e.target.value})}>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <div className="new__quiz__submit member__info__submit">
                                                        <div>
                                                            <i class='bx bxs-edit' ></i>
                                                            <input type="button" value={"Submit"} onClick={addNewQuestion}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <h2>Quiz questions</h2>
                                    {
                                        (questions && questions.length==0) ?
                                        <div>No questions</div>
                                        :
                                        questions && questions.map(question => (
                                            <div class="quizzes__upcoming__quizzes new__quiz member__info" style={{width: '800px'}}>
                                                <form>
                                                    <div className='new__quiz__inputs'>
                                                        <div className='new__quiz__input member__info__input'>
                                                            <div>Title:</div>
                                                            <input type="text" value={question && question.title} onChange={e => setQuestionInfo({...questionInfo, title: e.target.value})} />
                                                        </div>
                                                        <div className='new__quiz__input member__info__input'>
                                                            <div>Option 1:</div>
                                                            <input type="text" value={question && question.option_a} onChange={e => setQuestionInfo({...questionInfo, option_a: e.target.value})} />
                                                        </div>
                                                        <div className='new__quiz__input member__info__input'>
                                                            <div>Option 2:</div>
                                                            <input type="text" value={question && question.option_b} onChange={e => setQuestionInfo({...questionInfo, option_b: e.target.value})} />
                                                        </div>
                                                        <div className='new__quiz__input member__info__input'>
                                                            <div>Option 3:</div>
                                                            <input type="text" value={question && question.option_c} onChange={e => setQuestionInfo({...questionInfo, option_c: e.target.value})} />
                                                        </div>
                                                        <div className='new__quiz__input member__info__input'>
                                                            <div>Option 4:</div>
                                                            <input type="text" value={question && question.option_d} onChange={e => setQuestionInfo({...questionInfo, option_d: e.target.value})} />
                                                        </div>
                                                        <div className='new__quiz__input member__info__input'>
                                                            <div>Answer:</div>
                                                            <select onChange={e => setQuestionInfo({...questionInfo, answer: e.target.value})}>
                                                                <option selected={question && question.answer == "1"} value="1">1</option>
                                                                <option  selected={question && question.answer == "2"} value="2">2</option>
                                                                <option  selected={question && question.answer == "3"} value="3">3</option>
                                                                <option  selected={question && question.answer == "4"} value="4">4</option>
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
                                        ))
                                    }
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
    )
}

export default AddQuestions;