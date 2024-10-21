import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/login.css'; // Ensure this CSS file exists
import QuizDescription from '../components/QuizDescription';

function Login() {
  const [identifier, setIdentifier] = useState(''); // This will accept either username or email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      console.log("Sending login request with:", { identifier, password }); // Log the request data
      const response = await fetch('https://quizz-lms.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }) // Ensure this matches the backend expectation
      });

      if (response.ok) {
        const { token, role } = await response.json();
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        // Redirect based on role
        navigate(role === 'student' ? '/student-home' : '/teacher-home');
      } else {
        const errMsg = await response.text(); // Get the error message from the response
        setError(errMsg);
      }
    } catch (err) {
      setError('Network error, please try again later.');
    }
  };

  return (
    <div className="LoginPage">
      <div className="LoginContainer">
        <div className="Login">
          <h2>Login</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="identifier">Email/Username:</label>
              <input
                type="text"
                id="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
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
            <button type="submit">Login</button>
          </form>
          <p className="signup-link">
            Don't have an account? <a href="/register">Sign Up</a>
          </p>
        </div>
        <QuizDescription />
      </div>
    </div>
  );
}

export default Login;
