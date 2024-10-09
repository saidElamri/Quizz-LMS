import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'; 
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token) {
      const decodedToken = jwt_decode(token);
      // Adjust these field names based on your actual token payload
      setUser({
        email: decodedToken.user_email, // Changed from email to user_email
        role: role,
        name: decodedToken.user_name // Changed from name to user_name
      });
    } else {
      navigate('/'); // Redirect to login if no token is found
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <Header />
    <div style={styles.container}>
      <h1>Profile</h1>
      <div style={styles.profileBox}>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Name:</strong> {user.name}</p>
      </div> 
      <button onClick={handleLogout} style={styles.logoutButton}>
        Log Out
      </button>
    </div>
    <Footer />
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  profileBox: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginBottom: '20px',
    width: '300px',
    textAlign: 'left',
  },
  logoutButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Profile;
