import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../pages/login.css'; // Ensure this CSS file exists
import QuizDescription from '../components/QuizDescription';

function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://quizz-lms.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password })
      });

      if (response.ok) {
        const { token, role } = await response.json();
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        Swal.fire({
          title: 'Success!',
          text: 'You are logged in.',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            popup: 'my-custom-popup', // Add custom class for styles if needed
          }
        }).then(() => {
          navigate(role === 'student' ? '/student-home' : '/teacher-home');
        });
      } else {
        const errMsg = await response.text();
        setError(errMsg);
        Swal.fire({
          title: 'Error!',
          text: errMsg || 'Invalid credentials, please try again.',
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
      }
    } catch (err) {
      setError('Network error, please try again later.');
      Swal.fire({
        title: 'Network Error!',
        text: 'Network error, please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
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
