import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import '../pages/login.css'; //
import QuizDescription from '../components/QuizDescription';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await login(email, password);
      // Assuming the API returns a token and user role
      const { token, role } = response.data;

      // Store token and role in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Redirect based on the user role
      if (role === 'student') {
        navigate('/student-home');
      } else if (role === 'teacher') {
        navigate('/teacher-home');
      }
    } catch (err) {
      setError('Invalid email or password');
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
