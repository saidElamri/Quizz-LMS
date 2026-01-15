import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Fetch quizzes from your API
    const fetchQuizzes = async () => {
      // TODO: Replace with actual API call
      const mockQuizzes = [
        { id: 1, title: 'Math Quiz', description: 'Test your math skills' },
        { id: 2, title: 'Science Quiz', description: 'Explore scientific concepts' },
        { id: 3, title: 'History Quiz', description: 'Journey through time' },
      ];
      setQuizzes(mockQuizzes);
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="QuizList">
      <h2>Available Quizzes</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
            <Link to={`/quiz/${quiz.id}`}>Take Quiz</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizList;