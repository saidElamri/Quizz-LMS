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
        <div style={styles.gridContainer}>
          <div style={styles.card}>
            <UpcomingQuizzes quizzes={upcomingQuizzes} />
          </div>
          <div style={styles.card}>
            <RecentActivity activities={recentActivity} />
          </div>
          <div style={styles.card}>
            <Progress progress={progress} />
          </div>
          <div style={styles.card}>
            <Leaderboard students={leaderboard} />
          </div>
          <div style={styles.card}>
            <Resources resources={resources} />
          </div>
        </div>
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
    backgroundColor: '#f4f7fc',
  },
  container: {
    flex: 1,
    width: '90%',
    padding: '20px',
    maxWidth: '1300px',
    margin: '20px auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: '40px',
    color: '#2c3e50',
    fontSize: '3rem',
    fontWeight: 'bold',
    letterSpacing: '1px',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    width: '100%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
  },
  cardHover: {
    transform: 'scale(1.05)',
  },
};

export default StudentHome;
