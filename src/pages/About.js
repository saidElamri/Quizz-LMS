import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './About.css'

function About() {
  return (
    <div >
       <Header />
       <div>
      <h1>About QuizMaster: Empowering Education Through Interactive Learning</h1>
      
      <section>
        <h2>Our Mission</h2>
        <p>At QuizMaster, we believe that learning should be engaging, accessible, and tailored to individual needs. Our mission is to empower educators and students alike by providing a robust platform for creating, sharing, and taking quizzes across a wide range of subjects.</p>
      </section>

      <section>
        <h2>What We Offer</h2>
        <h3>For Educators:</h3>
        <p>QuizMaster offers an intuitive interface for creating customized quizzes. Whether you're a school teacher, university professor, or corporate trainer, our platform allows you to easily design assessments that challenge and inspire your students.</p>
        
        <h3>For Students:</h3>
        <p>Dive into a world of knowledge with our diverse range of quizzes. Test your understanding, track your progress, and learn at your own pace. With instant feedback and detailed explanations, QuizMaster turns every quiz into a valuable learning experience.</p>
      </section>

      {/* Add more sections for Features, Story, etc. */}

      <section>
        <h2>Contact Us</h2>
        <p>Have questions or suggestions? We'd love to hear from you! Reach out to our support team at support@quizmaster.com or connect with us on social media.</p>
      </section>
      </div>
      <Footer />
    </div>
  );
}
export default About;
