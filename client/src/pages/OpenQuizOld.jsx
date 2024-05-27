import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import SideNavbar from "../components/SideNavbar";

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

    useEffect(() => {
        getQuizInfoById();
        getQuestionsByQuizId();
        calculateScore();
    }, []);


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
    };    

    const saveScore = async (score) => {
        // const quizId = id.charAt(id.length - 1);
        // try {
        //     const response = await axios.post(
                
        //         'http://localhost:5000/api/v1/scores/save-score',
        //         { quizId, score, iduser }
        //     );
        //     console.log(response.data);
        // } catch (error) {
        //     console.error('Error saving score', error);
        // }
        console.log(id, score, userId);
    };

    useEffect(() => {
        getUserData();
    }, []);

    // counter
    let initialTime = quizInfo.duration;
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        const parseTime = (timeString) => {
          const [hours, minutes] = timeString.split(':').map(Number);
          return (hours * 60 + minutes) * 60; 
        };
    
        let totalTimeInSeconds = parseTime(initialTime);
    
        const updateTimer = () => {
          totalTimeInSeconds -= 1;
          if (totalTimeInSeconds <= 0) {
            clearInterval(interval);
            navigate('/quizzes');
            return '00:00';
          }
          const hours = String(Math.floor(totalTimeInSeconds / 3600)).padStart(2, '0');
          const minutes = String(Math.floor((totalTimeInSeconds % 3600) / 60)).padStart(2, '0');
          const seconds = String(totalTimeInSeconds % 60).padStart(2, '0');
          return `${hours}:${minutes}:${seconds}`;
        };
    
        const interval = setInterval(() => {
          setTime(updateTimer);
        }, 1000);
    
        return () => clearInterval(interval);
      }, [initialTime, navigate]);

  const formatTime = (totalSeconds) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };


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
                                <p>Title: {quizInfo.title}</p>
                                <p>Description: {quizInfo.description}</p>
                                <p>Date: {quizInfo.date}</p>
                                <p>Time: {quizInfo.time}</p>
                                <p>Duration (HH:MM): {quizInfo.duration}</p>
                                <p>Group: {quizInfo.group_id}</p>
                            </div>
                            <div>
                                <h3>Time Remaining: {time}</h3>
                                <h3>Questions</h3>
                                {questions.map((question, index) => (
                                    <div key={question.id}>
                                        <p>Question {index + 1}: {question.title}</p>
                                        <select value={selectedOptions[question.id]} onChange={(e) => handleAnswer(question.id, e.target.value)}>
                                            <option value="">Choose an option</option>
                                            <option value={question.option_a}>{question.option_a}</option>
                                            <option value={question.option_b}>{question.option_b}</option>
                                            <option value={question.option_c}>{question.option_c}</option>
                                            <option value={question.option_d}>{question.option_d}</option>
                                        </select>
                                    </div>
                                ))}
                                <button onClick={calculateScore} className="btn submit-btn">Submit</button>
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
