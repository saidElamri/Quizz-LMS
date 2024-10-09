// UpcomingQuizzes.js
import React from 'react';

const UpcomingQuizzes = ({ quizzes }) => {
  return (
    <div style={styles.section}>
      <h2>Upcoming Quizzes</h2>
      <ul>
        {quizzes.length > 0 ? (
          quizzes.map((quiz, index) => (
            <li key={index}>{quiz.name} - {quiz.dueDate}</li>
          ))
        ) : (
          <li>No upcoming quizzes</li>
        )}
      </ul>
    </div>
  );
};

const styles = {
  section: {
    marginBottom: '20px',
  },
};

export default UpcomingQuizzes;
