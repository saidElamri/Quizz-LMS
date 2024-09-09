import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Home.css'; // Assuming you have a Home.css for styling

function Home() {
  return (
    <div>
      <Header />
      <main className="home-container">
        <section className="hero">
          <h1>Welcome to MLS Quiz App</h1>
          <p>Your go-to platform for engaging quizzes and learning experiences.</p>
          <div className="cta-buttons">
            <button className="cta-btn">Start a Quiz</button>
            <button className="cta-btn">View All Quizzes</button>
          </div>
        </section>
        
        <section className="featured-quizzes">
          <h2>Featured Quizzes</h2>
          <div className="quiz-list">
            {/* Map through featured quizzes here */}
            <div className="quiz-item">
              <h3>Quiz Title 1</h3>
              <p>Brief description of the quiz.</p>
              <button>Start Quiz</button>
            </div>
            <div className="quiz-item">
              <h3>Quiz Title 2</h3>
              <p>Brief description of the quiz.</p>
              <button>Start Quiz</button>
            </div>
            {/* Add more quizzes as needed */}
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
