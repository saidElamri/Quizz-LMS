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
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=30&type=multiple');
        if (!response.ok) {
          throw new Error('Failed to fetch quizzes');
        }
        const data = await response.json();
        setQuizzes(data.results.map(quiz => ({
          ...quiz,
          shuffledAnswers: shuffleAnswers([
            ...quiz.incorrect_answers,
            quiz.correct_answer
          ])
        })));
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        setError('Failed to load quizzes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  // Fisher-Yates Shuffle Algorithm for shuffling answers
  const shuffleAnswers = (answers) => {
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  };

  const handleAnswerChange = (questionIndex, selectedAnswer) => {
    // Set the user's answer and check if it's correct
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
      setScore(prevScore => prevScore + 1); // Increment the score if the answer is correct
    }

    if (questionIndex < quizzes.length - 1) {
      setCurrentQuizIndex(prevIndex => prevIndex + 1); // Move to the next quiz automatically
    } else {
      setShowScorePopup(true); // Show the score popup after the last quiz
    }
  };

  // Handle moving to the next quiz manually if needed
  const handleNextQuiz = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(prevIndex => prevIndex + 1); // Move to the next quiz
      setShowScorePopup(false); // Close the score popup
    }
  };

  // Handle restarting the quiz
  const handleRestartQuiz = () => {
    setUserAnswers({});
    setResults({});
    setScore(0);
    setShowScorePopup(false);
    setCurrentQuizIndex(0); // Reset to the first quiz
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  // Check if the current quiz is the last one
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
              {quizzes[currentQuizIndex].shuffledAnswers.map((option, i) => {
                const isSelected = userAnswers[currentQuizIndex] === option;
                const isCorrect = results[currentQuizIndex] === true;
                const isIncorrect = results[currentQuizIndex] === false;

                return (
                  <div
                    key={i}
                    className={`option ${isCorrect && isSelected ? 'correct' : isIncorrect && isSelected ? 'incorrect' : ''}`}
                    onClick={() => handleAnswerChange(currentQuizIndex, option)}
                  >
                    <label>
                      <input
                        type="radio"
                        name={`question-${currentQuizIndex}`}
                        value={option}
                        style={{ display: 'none' }} // Hide the actual radio button
                        checked={isSelected}
                        readOnly
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
              {isLastQuiz ? (
                <button className="restart-quiz-button" onClick={handleRestartQuiz}>
                  Restart Quiz
                </button>
              ) : (
                <button className="next-quiz-button" onClick={handleNextQuiz}>
                  Next Quiz
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Quiz;
