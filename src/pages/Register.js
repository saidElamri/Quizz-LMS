import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';  // Import SweetAlert2
import '../pages/Register.css';
import moroccoGif from '../assets/morocco-540.gif'; // Adjust the path as necessary

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://quizz-lms.onrender.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, role }),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'You have successfully registered. Redirecting to the login page...',
          timer: 3000,  // 3 seconds before redirect
          showConfirmButton: false
        });

        setTimeout(() => {
          navigate('/');  // Redirect to login page after the alert
        }, 3000);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Something went wrong. Please try again!',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred during registration. Please try again later.',
      });
    }
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
          <img src={moroccoGif} alt="Morocco GIF" className="education-gif" />
        </div>
      </div>
    </div>
  );
}

export default Register;
