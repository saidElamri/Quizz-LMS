import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const StudentHome = () => {
  const [upcomingQuizzes, setUpcomingQuizzes] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [progress, setProgress] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    // Fetch upcoming quizzes, recent activity, progress, etc. from API
    fetchUpcomingQuizzes();
    fetchRecentActivity();
    fetchProgress();
    fetchLeaderboard();
    fetchResources();
  }, []);

  const fetchUpcomingQuizzes = async () => {
    // Fetch data from your API
    const data = []; // Replace with actual API call
    setUpcomingQuizzes(data);
  };

  const fetchRecentActivity = async () => {
    const data = []; // Replace with actual API call
    setRecentActivity(data);
  };

  const fetchProgress = async () => {
    const data = 75; // Replace with actual API call
    setProgress(data);
  };

  const fetchLeaderboard = async () => {
    const data = []; // Replace with actual API call
    setLeaderboard(data);
  };

  const fetchResources = async () => {
    const data = []; // Replace with actual API call
    setResources(data);
  };

  return (
    <div>
      <Header />
    <div style={styles.container}>
      <h1>Welcome, Student!</h1>

      <div style={styles.section}>
        <h2>Upcoming Quizzes</h2>
        <ul>
          {upcomingQuizzes.map((quiz, index) => (
            <li key={index}>{quiz.name} - {quiz.dueDate}</li>
          ))}
        </ul>
      </div>

      <div style={styles.section}>
        <h2>Recent Activity</h2>
        <ul>
          {recentActivity.map((activity, index) => (
            <li key={index}>{activity.name} - {activity.score}</li>
          ))}
        </ul>
      </div>

      <div style={styles.section}>
        <h2>Your Progress</h2>
        <p>Progress: {progress}%</p>
      </div>

      <div style={styles.section}>
        <h2>Leaderboard</h2>
        <ul>
          {leaderboard.map((student, index) => (
            <li key={index}>{student.name} - {student.score}</li>
          ))}
        </ul>
      </div>

      <div style={styles.section}>
        <h2>Resources</h2>
        <ul>
          {resources.map((resource, index) => (
            <li key={index}>{resource.title}</li>
          ))}
        </ul>
      </div>
    </div>
    <Footer />
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  section: {
    marginBottom: '20px',
  },
};

export default StudentHome;

