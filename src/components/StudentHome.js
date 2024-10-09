import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UpcomingQuizzes from '../components/StudentComponent/UpcomingQuizzes';
import RecentActivity from '../components/StudentComponent/RecentActivity';
import Progress from '../components/StudentComponent/Progress';
import Leaderboard from '../components/StudentComponent/Leaderboard';
import Resources from '../components/StudentComponent/Resources';

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
    <div style={styles.pageContainer}>
      <Header />
      <div style={styles.container}>
        <h1 style={styles.title}>Welcome, Student!</h1>
        <UpcomingQuizzes quizzes={upcomingQuizzes} />
        <RecentActivity activities={recentActivity} />
        <Progress progress={progress} />
        <Leaderboard students={leaderboard} />
        <Resources resources={resources} />
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
    width: '80%',
    padding: '40px',
    maxWidth: '1200px',
    margin: '20px auto',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
    fontSize: '2.5rem',
  },
};

export default StudentHome;
