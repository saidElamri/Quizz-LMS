import React from 'react';

const StudentProgress = ({ students }) => {
  return (
    <div style={styles.container}>
      <h2>Student Progress</h2>
      <ul style={styles.list}>
        {students.length > 0 ? (
          students.map((student, index) => (
            <li key={index} style={styles.listItem}>
              <div style={styles.studentInfo}>
                <span style={styles.studentName}>{student.name}</span>
                <span style={styles.studentProgress}>{student.progress}%</span>
              </div>
              <div style={styles.progressBarContainer}>
                <div
                  style={{
                    ...styles.progressBar,
                    width: `${student.progress}%`,
                    backgroundColor:
                      student.progress >= 75
                        ? '#28a745'
                        : student.progress >= 50
                        ? '#ffc107'
                        : '#dc3545',
                  }}
                ></div>
              </div>
            </li>
          ))
        ) : (
          <p>No student progress available.</p>
        )}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    marginBottom: '20px',
    width: '92%',
    maxWidth: '800px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    padding: '10px 0',
    borderBottom: '1px solid #ddd',
  },
  studentInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  studentName: {
    fontWeight: 'bold',
  },
  studentProgress: {
    fontWeight: 'bold',
  },
  progressBarContainer: {
    width: '90%',
    backgroundColor: '#f1f1f1',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '10px',
    borderRadius: '8px',
  },
};

export default StudentProgress;
