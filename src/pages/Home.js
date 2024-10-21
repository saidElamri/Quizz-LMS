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

  // Function to handle starting the quiz
  const handleStartQuiz = (quizId) => {
    console.log('Navigating to quiz with ID:', quizId);
    navigate(`/quiz/${quizId}`); // Redirect to the quiz page using the quiz ID
  };
  

  // New function to start a random quiz
  const handleStartRandomQuiz = () => {
    if (quizzes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quizzes.length);
      const randomQuizId = quizzes[randomIndex]._id;
      navigate(`/quiz/${randomQuizId}`);
    } else {
      alert("No quizzes available at the moment.");
    }
  };

  // New function to view all quizzes
  const handleViewAllQuizzes = () => {
    navigate('/quiz');  // Assuming you have a route for all quizzes
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
                <div className="quiz-item" key={quiz._id}> {/* Ensure quiz._id is correct */}
                  <h3>{quiz.title}</h3>
                  <p>{quiz.description || 'No description available.'}</p>
                  <button onClick={() => handleStartQuiz(quiz._id)}>Start Quiz</button> {/* Pass quiz._id to start the quiz */}
                </div>
              ))
            ) : (
              <p>No quizzes available at the moment.</p>
            )}
          </div>
        </section>
        
        <section className="announcements">
          <h2>Announcements</h2>
          <p>No upcoming events or announcements at this time.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
