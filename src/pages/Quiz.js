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
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: selectedAnswer,
    });
    setResults({
      ...results,
      [questionIndex]: quizzes[questionIndex].correct_answer === selectedAnswer,
    });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="quiz-container">
      <Header />
      <h1 className="quiz-title">Random Quizzes</h1>
      {quizzes.map((quiz, index) => (
        <div key={index} className="quiz-card">
          <h3 className="quiz-question">{quiz.question}</h3>
          <div className="quiz-options">
            {quiz.incorrect_answers.concat(quiz.correct_answer).sort().map((option, i) => {
              const isSelected = userAnswers[index] === option; // Check if this option is selected
              const isCorrect = results[index] === true; // Check if the answer is correct
              const isIncorrect = results[index] === false; // Check if the answer is incorrect
              
              return (
                <div 
                  key={i} 
                  className={`option ${isCorrect && isSelected ? 'correct' : isIncorrect && isSelected ? 'incorrect' : ''}`}
                >
                  <label>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      onChange={() => handleAnswerChange(index, option)}
                      checked={isSelected} // Mark the selected option
                    />
                    {option}
                  </label>
                </div>
              );
            })}
          </div>
          {results[index] !== undefined && (
            <div className={`result ${results[index] ? 'correct' : 'incorrect'}`}>
              {results[index] ? 'Correct!' : 'Incorrect, try again.'}
            </div>
          )}
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default Quiz;
