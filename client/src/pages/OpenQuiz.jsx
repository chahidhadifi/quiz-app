import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import SideNavbar from "../components/SideNavbar";
import CountDown from "../components/CountDown";

const OpenQuizOld = () => {
    const { id } = useParams();
    const [userId, setUserId] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [role, setRole] = useState(null);

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const [quizInfo, setQuizInfo] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        duration: '',
        group_id: ''
    });

    const [questions, setQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [score, setScore] = useState(null);

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

    const minutesToHHMM = (minutes) => {
        var hours = Math.floor(minutes / 60);
        var remainingMinutes = minutes % 60;
        var hoursStr = hours < 10 ? '0' + hours : hours.toString();
        var minutesStr = remainingMinutes < 10 ? '0' + remainingMinutes : remainingMinutes.toString();
        return hoursStr + ':' + minutesStr;
    }


    const getQuestionsByQuizId = () => {
        const quizId = id.charAt(id.length - 1);
        axios.get(`http://localhost:5000/api/v1/questions/get-question-by-quiz-id/${quizId}`)
            .then(res => {
                setQuestions(res.data);
                const initialOptions = {};
                res.data.forEach(question => {
                    initialOptions[question.id] = '';
                });
                setSelectedOptions(initialOptions);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const getUserData = () => {
        axios.get('http://localhost:5000/api/v1/users/token')
        .then(res => {
          if (res.data.status === "Success") {
            setFirstName(res.data.first_name);
            setLastName(res.data.last_name);
            setRole(res.data.role);
            setUserId(res.data.id);
          }
        })
        .catch(err => {
            console.log(err.message);
        });
    }

    const handleAnswer = (questionId, option) => {
        setSelectedOptions(prevOptions => ({
            ...prevOptions,
            [questionId]: option
        }));
    };

    const calculateScore = () => {
        let correctAnswers = 0;
        questions.forEach(question => {
            const selectedOption = selectedOptions[question.id];
            if (selectedOption && selectedOption === question.answer) {
                correctAnswers++;
            }
        });
        const totalScore = parseFloat(((correctAnswers / questions.length) * 100).toFixed(1));
        setScore(totalScore);
        saveScore(totalScore);
        navigate('/quizzes');
    };

    const [scoreTemp, setScoreTemp] = useState(null);

    const saveScore = (score) => {
        const updatedScoreTemp = {
            member_id: userId,
            quiz_id: id,
            score: score
        };
        
        axios.post('http://localhost:5000/api/v1/results/', updatedScoreTemp)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    
        console.log(updatedScoreTemp);
    };
    

    const checkResultAndRedirect = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/results/check-result', {
                member_id: userId,
                quiz_id: id
            });

            if (response.data.exists) {
                navigate('/quizzes');
            } else {
                console.log('Result does not exist');
            }
        } catch (err) {
            console.error('Error checking result:', err);
        }
    };

    const timeLeft = CountDown(quizInfo.date, quizInfo.time, quizInfo.duration, navigate);

    useEffect(() => {
        getQuizInfoById();
        getQuestionsByQuizId();
        getUserData();
        checkResultAndRedirect();
    }, [userId]);

    return (
        <div className="dashboard">
            <Navbar firstName={firstName || ''} lastName={lastName || ''} role={role || ''}></Navbar>
            <div className="dashboard__main">
                <SideNavbar role={role}></SideNavbar>
                <div className="dashboard__content" style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                        <Link to='/quizzes' style={{ textDecoration: 'none' }}>
                            <button className="btn new-quiz" style={{ width: '100px' }}>
                                <i className='bx bx-arrow-back'></i>
                                <h4>Back</h4>
                            </button>
                        </Link>
                    </div>
                    <div className="quizzes__content__item">
                        <div className="quizzes__upcoming__quizzes new__quiz member__info" style={{ width: '800px' }}>
                            <div>
                                <h3>Quiz informations</h3>
                                <div className='new__quiz__input member__info__input'>
                                    <div>Title:</div>
                                    <input type="text" readOnly value={quizInfo && quizInfo.title} />
                                </div>
                                <div className='new__quiz__input member__info__input'>
                                    <div>Date:</div>
                                    <input type="text" readOnly value={quizInfo && quizInfo.date} />
                                </div>
                                <div className='new__quiz__input member__info__input'>
                                    <div>Time:</div>
                                    <input type="text" readOnly value={quizInfo && quizInfo.time} />
                                </div>
                                <div className='new__quiz__input member__info__input'>
                                    <div style={{width: '250px'}}>Duration (HH:MM):</div>
                                    <input type="text" readOnly value={quizInfo && quizInfo.duration} />
                                </div>
                            </div>
                        </div>
                        <div className="quizzes__upcoming__quizzes new__quiz member__info" style={{ width: '800px', textTransform: 'capitalize' }}>
                            <div>
                                <h3 style={{float: 'right', marginRight: '10px', color: '#0D1321'}} className="flex flex-fd-r flex-ai-c">
                                    <i class='bx bxs-time' style={{marginRight: '5px'}}></i>
                                    Time Remaining: {timeLeft}
                                </h3>
                                <h3>Questions</h3>
                                {questions.map((question, index) => (
                                    <div key={question.id} style={{marginBottom: '20px'}}>
                                        <div className='new__quiz__input member__info__input'>
                                            <div style={{width: '213px'}}>Question {index + 1}:</div>
                                            <input type="text" readOnly value={question.title} />
                                        </div>
                                        <div className='new__quiz__input member__info__input'>
                                            <div>Answer:</div>
                                            <select style={{fontWeight: '500'}} value={selectedOptions[question.id]} onChange={(e) => handleAnswer(question.id, e.target.value)}>
                                                    <option value="">Choose an option</option>
                                                    <option value={question.option_a}>{question.option_a}</option>
                                                    <option value={question.option_b}>{question.option_b}</option>
                                                    <option value={question.option_c}>{question.option_c}</option>
                                                    <option value={question.option_d}>{question.option_d}</option>
                                            </select>
                                        </div>
                                    </div>
                                ))}
                                <div className="new__quiz__submit member__info__submit">
                                    <div onClick={calculateScore}>
                                        <i class='bx bxs-edit' ></i>
                                        <input type="button" value={"Submit"}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {score !== null && (
                        <div className="score-container">
                            <h3>Your Score: {score}%</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OpenQuizOld;
