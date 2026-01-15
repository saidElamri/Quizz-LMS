import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Home.css';

function Home() {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    setIsLoading(true);
    fetch('https://quizz-lms.onrender.com/api/quizzes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setQuizzes(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching quizzes:', error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  // Function to handle starting any quiz (redirects to /quizzes page)
  const handleStartQuiz = () => {
    navigate('/quizzes'); // Redirect to all quizzes page
  };

  // New function to start a random quiz
  const handleStartRandomQuiz = () => {
    if (quizzes.length > 0) {
      navigate('/quizzes');
    } else {
      alert("No quizzes available at the moment.");
    }
  };

  // New function to view all quizzes
  const handleViewAllQuizzes = () => {
    navigate('/quizzes');  // Redirects to all quizzes page
  };

  return (
    <div>
      <Header />
      <main className="home-container">
        <section className="hero">
          <h1>Welcome to MLS Quiz App</h1>
          <p>Your go-to platform for engaging quizzes and learning experiences.</p>
          <div className="cta-buttons">
            <button className="cta-btn" onClick={handleStartRandomQuiz}>Start a Quiz</button>
            <button className="cta-btn" onClick={handleViewAllQuizzes}>View All Quizzes</button>
          </div>
        </section>

        <section className="featured-quizzes">
          <h2>Featured Quizzes</h2>
          <div className="quiz-list">
            {isLoading ? (
              <p>Loading quizzes...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <div className="quiz-item" key={quiz._id}>
                  <h3>{quiz.title}</h3>
                  <p>{quiz.description || 'No description available.'}</p>
                  <button onClick={handleStartQuiz}>Go to All Quizzes</button>
                </div>
              ))
            ) : (
              <p>No quizzes available at the moment.</p>
            )}
          </div>
        </section>

        <section className="announcements">
          <h2>Announcements</h2>
          <div className="announcement">
            <h3>Weekly Quiz League!</h3>
            <p>🌟 Join our Weekly Quiz League starting this Saturday! Compete against other participants for the chance to earn points and climb the leaderboard. Exciting prizes await the top scorers at the end of the month!</p>
          </div>
          <div className="announcement">
            <h3>Themed Quiz Nights!</h3>
            <p>🎉 Don’t miss our Themed Quiz Nights every Thursday! This week’s theme is “Movies & TV Shows.” Gather your friends, form a team, and put your knowledge to the test! Prizes for the top three teams!</p>
          </div>
          <div className="announcement">
            <h3>Monthly Trivia Contest!</h3>
            <p>🏆 Mark your calendars for our Monthly Trivia Contest on the first Friday of every month! Join us for an evening of fun and learning, with various topics to challenge your skills. Everyone is welcome, and prizes will be awarded!</p>
          </div>
          <div className="announcement">
            <h3>Quiz Feedback Session!</h3>
            <p>💬 We value your input! Join us next Wednesday for a Quiz Feedback Session where you can share your thoughts and suggestions about our quizzes. Help us make the quiz experience even better!</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
