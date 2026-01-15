import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

function QuizCreator() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ text: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  const { user } = useAuth(); // Keeping the user for potential use
  const navigate = useNavigate();

  const addQuestion = () => {
    setQuestions([...questions, { text: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Include user information in the POST request if necessary
      await api.post('/quizzes', { title, questions, creator: user.id }); // Assuming user has an id
      navigate('/');
    } catch (error) {
      console.error('Failed to create quiz', error);
    }
  };

  return (
    <div className="QuizCreator">
      <h2>Create a New Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Quiz Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        {questions.map((question, qIndex) => (
          <div key={qIndex}>
            <h3>Question {qIndex + 1}</h3>
            <input
              type="text"
              value={question.text}
              onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
              placeholder="Question text"
              required
            />
            {question.options.map((option, oIndex) => (
              <div key={oIndex}>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...question.options];
                    newOptions[oIndex] = e.target.value;
                    updateQuestion(qIndex, 'options', newOptions);
                  }}
                  placeholder={`Option ${oIndex + 1}`}
                  required
                />
                <input
                  type="radio"
                  name={`correct-${qIndex}`}
                  checked={question.correctAnswer === oIndex}
                  onChange={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
                  required
                />
              </div>
            ))}
          </div>
        ))}
        <button type="button" onClick={addQuestion}>Add Question</button>
        <button type="submit">Create Quiz</button>
      </form>
    </div>
  );
}

export default QuizCreator;
