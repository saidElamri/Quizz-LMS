import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear token from localStorage and redirect to login
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  return <div>Logging you out...</div>;
}

export default Logout;
