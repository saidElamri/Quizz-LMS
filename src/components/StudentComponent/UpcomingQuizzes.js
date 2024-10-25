// UpcomingQuizzes.js
import React from 'react';

const UpcomingQuizzes = () => {
  const quizzes = [
    { name: 'Math Quiz', dueDate: 'October 30, 2024' },
    { name: 'History Quiz', dueDate: 'November 5, 2024' },
    { name: 'Science Quiz', dueDate: 'November 12, 2024' },
    { name: 'Geography Quiz', dueDate: 'November 20, 2024' },
  ];

  return (
    <div style={styles.section}>
      <h2 style={styles.heading}>Upcoming Quizzes</h2>
      <ul style={styles.quizList}>
        {quizzes.length > 0 ? (
          quizzes.map((quiz, index) => (
            <li key={index} style={styles.quizItem}>
              <span style={styles.quizName}>{quiz.name}</span>
              <span style={styles.dueDate}>{quiz.dueDate}</span>
            </li>
          ))
        ) : (
          <li style={styles.noQuiz}>No upcoming quizzes</li>
        )}
      </ul>
    </div>
  );
};

const styles = {
  section: {
    marginBottom: '20px',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '22px',
    marginBottom: '15px',
    color: '#333',
  },
  quizList: {
    listStyleType: 'none',
    padding: 0,
  },
  quizItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#ffffff',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
  },
  quizName: {
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#007BFF',
  },
  dueDate: {
    color: '#666',
  },
  noQuiz: {
    fontStyle: 'italic',
    color: '#888',
  },
};

export default UpcomingQuizzes;
