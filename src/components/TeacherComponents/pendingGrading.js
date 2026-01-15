import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PendingGrading = () => {
  const [pendingQuizzes, setPendingQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPendingGrading();
  }, []);

  const fetchPendingGrading = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();

      // Transform the data to simulate pending quizzes
      const transformedData = data.slice(0, 5).map((item, index) => ({
        _id: item.id,
        title: item.title,
        studentName: `Student ${index + 1}`
      }));

      setPendingQuizzes(transformedData);
    } catch (error) {
      console.error('Error fetching pending grading quizzes:', error);
    }
  };

  const handleGradeQuiz = (quizId) => {
    navigate(`/grade-quiz/${quizId}`);
  };

  return (
    <div style={styles.container}>
      <h2>Pending Grading</h2>
      {pendingQuizzes.length === 0 ? (
        <p>No quizzes pending grading at the moment.</p>
      ) : (
        <ul style={styles.quizList}>
          {pendingQuizzes.map((quiz, index) => (
            <li key={index} style={styles.quizItem}>
              <div>
                <strong>Quiz:</strong> {quiz.title} <br />
                <strong>Student:</strong> {quiz.studentName}
              </div>
              <button style={styles.gradeButton} onClick={() => handleGradeQuiz(quiz._id)}>
                Grade
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    marginTop: '20px',
    maxWidth: '800px',
  },
  quizList: {
    listStyleType: 'none',
    padding: 0,
  },
  quizItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    marginBottom: '10px',
    borderBottom: '1px solid #ddd',
  },
  gradeButton: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default PendingGrading;
