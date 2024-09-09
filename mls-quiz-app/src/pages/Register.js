import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../pages/Register.css';
function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send a request to your backend API
    console.log('Registration attempt:', { username, email, password, role });
    // TODO: Implement actual registration logic
    navigate('/'); // Redirect to login page after registration
  };

  return (
    <div className="RegisterPage">
      
      <div className="RegisterContainer">
        <main className="Register">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="role">Role:</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
            <button type="submit">Register</button>
          </form>
        </main>
        <div className="Description">
          <h2>Why Join Us?</h2>
          <p>
            Register to access a variety of quizzes designed to enhance your learning experience. Whether you are a student or teacher, our platform offers valuable resources and tools to aid in your educational journey.
          </p>
        </div>
      </div>
      
    </div>
  );
}

export default Register;
