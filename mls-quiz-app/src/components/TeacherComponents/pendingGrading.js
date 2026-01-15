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
      // Fetch pending quizzes from the API
      const response = await fetch('http://localhost:3001/api/pending-grading');
      const data = await response.json();

      if (response.ok) {
        setPendingQuizzes(data);
      } else {
        console.error('Failed to fetch pending grading quizzes');
      }
    } catch (error) {
      console.error('Error fetching pending grading quizzes:', error);
    }
  };

  const handleGradeQuiz = (quizId) => {
    // Navigate to the grading page for the selected quiz
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
