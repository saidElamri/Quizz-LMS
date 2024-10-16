import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../pages/Quiz.css';

const Quiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  // Fetch all quizzes
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/api/quizzes', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch quizzes');
        }

        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        setError('Failed to load quizzes. Please try again later.');
      }
    };

    fetchQuizzes();
  }, []);

  // Fetch the specific quiz
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        if (!quizId) {
          throw new Error('No quiz ID found!');
        }

        const response = await fetch(`http://localhost:3001/api/quizzes/${quizId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch quiz');
        }

        const data = await response.json();
        setQuiz(data);
      } catch (error) {
        console.error('Error fetching quiz:', error);
        setError('Failed to load quiz. Please try again later.');
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleAnswerChange = useCallback((questionIndex, selectedOption) => {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionIndex]: selectedOption,
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!quiz) return;

    const calculatedScore = quiz.questions.reduce((acc, question, index) => {
      return acc + (userAnswers[index] === question.correctAnswer ? 1 : 0);
    }, 0);

    setScore(calculatedScore);
    setShowPopup(true); // Show the popup when the quiz is submitted
  }, [quiz, userAnswers]);

  const handleNextQuiz = () => {
    if (score >= 2 && quizzes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quizzes.length);
      const nextQuizId = quizzes[randomIndex]._id;
      navigate(`/quiz/${nextQuizId}`);
    }
    setShowPopup(false); // Close the popup
  };

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!quiz) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="quiz-container">
      <Header />
      <h1 className="quiz-title">{quiz.title}</h1>
      <form onSubmit={handleSubmit} className="quiz-form">
        {quiz.questions.map((question, index) => (
          <div key={index} className="question-container">
            <h3 className="question">{question.questionText}</h3>
            {question.options.map((option, i) => (
              <div key={i} className="option">
                <label>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={userAnswers[index] === option}
                    onChange={() => handleAnswerChange(index, option)}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit" className="submit-button">Submit</button>
      </form>

      {/* Score Popup */}
      {showPopup && (
        <div className="score-popup">
          <div className="score-popup-content">
            <h2>Your Score: {score}/{quiz.questions.length}</h2>
            {score >= 2 ? (
              <button className="next-quiz-button" onClick={handleNextQuiz}>
                Next Quiz
              </button>
            ) : (
              <p className="low-score-message">You need at least 2 points to move to the next quiz.</p>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Quiz;
