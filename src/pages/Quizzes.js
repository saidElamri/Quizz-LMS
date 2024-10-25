// src/pages/Quizzes.js

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Quizzes.css';

function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null); // For selected quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://quizz-lms.onrender.com/api/quizzes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch quizzes: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setQuizzes(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching quizzes:', error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  // Function to select a quiz to play
  const handleSelectQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setIsFinished(false);
  };

  const handleAnswerSelect = (answer) => {
    setUserAnswers([...userAnswers, answer]);
    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setIsFinished(false);
  };

  return (
    <div>
      <Header />
      <main className="quizzes-container">
        <h1>All Quizzes</h1>

        {selectedQuiz ? (
          <div className="play-quiz-container">
            <h2>{selectedQuiz.title}</h2>
            {isFinished ? (
              <div>
                <h3>Quiz Completed!</h3>
                <p>Your Answers: {userAnswers.join(', ')}</p>
                <button onClick={resetQuiz}>Back to Quizzes</button>
              </div>
            ) : (
              <div className="question-section">
                <h3>Question {currentQuestionIndex + 1}</h3>
                <p>{selectedQuiz.questions[currentQuestionIndex].question}</p>
                <div className="answer-options">
                  {selectedQuiz.questions[currentQuestionIndex].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      className="answer-button"
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <button onClick={resetQuiz} className="go-back-button">Back to Quizzes</button>
              </div>
            )}
          </div>
        ) : (
          isLoading ? (
            <p>Loading quizzes...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <div className="quiz-list">
              {quizzes.map((quiz) => (
                <div className="quiz-card" key={quiz._id}>
                  <h3>{quiz.title}</h3>
                  <p>{quiz.description || 'No description available.'}</p>
                  <button onClick={() => handleSelectQuiz(quiz)}>Start Quiz</button>
                </div>
              ))}
            </div>
          )
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Quizzes;
