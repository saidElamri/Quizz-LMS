import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../pages/Quiz.css';

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [score, setScore] = useState(0);
  // Removed completedQuizzes state as it's not used
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0); // Track the current quiz

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=30&type=multiple');
        if (!response.ok) {
          throw new Error('Failed to fetch quizzes');
        }
        const data = await response.json();
        setQuizzes(data.results);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        setError('Failed to load quizzes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleAnswerChange = (questionIndex, selectedAnswer) => {
    // Set user answer and check if it's correct
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: selectedAnswer,
    });

    const isCorrect = quizzes[questionIndex].correct_answer === selectedAnswer;
    setResults({
      ...results,
      [questionIndex]: isCorrect,
    });

    if (isCorrect) {
      setScore(prevScore => prevScore + 1); // Increment score
    }

    // Move to next quiz after selection
    if (questionIndex < quizzes.length - 1) {
      setCurrentQuizIndex(prevIndex => prevIndex + 1);
    } else {
      setShowScorePopup(true); // Show score popup after last quiz
    }
  };

  const handleNextQuiz = () => {
    setShowScorePopup(false);
    setCurrentQuizIndex(prevIndex => prevIndex + 1); // Move to next quiz
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  // Check if all quizzes are answered
  const isLastQuiz = currentQuizIndex === quizzes.length - 1;

  return (
    <div>
      <Header />
      <div className="quiz-container">
        <h1 className="quiz-title">Random Quizzes</h1>

        {currentQuizIndex < quizzes.length && (
          <div className="quiz-card">
            <h3 className="quiz-question">{quizzes[currentQuizIndex].question}</h3>
            <div className="quiz-options">
              {quizzes[currentQuizIndex].incorrect_answers.concat(quizzes[currentQuizIndex].correct_answer).sort().map((option, i) => {
                const isSelected = userAnswers[currentQuizIndex] === option; // Check if this option is selected
                const isCorrect = results[currentQuizIndex] === true; // Check if the answer is correct
                const isIncorrect = results[currentQuizIndex] === false; // Check if the answer is incorrect
                
                return (
                  <div 
                    key={i} 
                    className={`option ${isCorrect && isSelected ? 'correct' : isIncorrect && isSelected ? 'incorrect' : ''}`}
                    onClick={() => handleAnswerChange(currentQuizIndex, option)} // Make the entire option clickable
                  >
                    <label>
                      <input
                        type="radio"
                        name={`question-${currentQuizIndex}`}
                        value={option}
                        style={{ display: 'none' }} // Hide the actual radio button
                        checked={isSelected} // Mark the selected option
                        readOnly // Prevent clicking the radio button directly
                      />
                      {option}
                    </label>
                  </div>
                );
              })}
            </div>
            {results[currentQuizIndex] !== undefined && (
              <div className={`result ${results[currentQuizIndex] ? 'correct' : 'incorrect'}`}>
                {results[currentQuizIndex] ? 'Correct!' : 'Incorrect, try again.'}
              </div>
            )}
          </div>
        )}

        {/* Score popup */}
        {showScorePopup && (
          <div className="score-popup">
            <div className="score-popup-content">
              <h2>Quiz Completed!</h2>
              <p className="score">Your Score: {score} / {quizzes.length}</p>
              <button className="next-quiz-button" onClick={handleNextQuiz}>
                {isLastQuiz ? 'Close' : 'Next Quiz'}
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Quiz;
