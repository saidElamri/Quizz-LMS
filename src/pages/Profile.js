import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role) {
      // Decode the token if needed (optional)
      // const decodedToken = jwt_decode(token); // Commented out to avoid warning

      // Redirect based on the user's role
      if (role === 'teacher') {
        navigate('/teacher-home'); // Adjust the route as necessary
      } else if (role === 'student') {
        navigate('/student-home'); // Adjust the route as necessary
      } else {
        navigate('/'); // Redirect to login or another route if role is invalid
      }
    } else {
      navigate('/'); // Redirect to login if no token is found
    }
  }, [navigate]);

  return null; // Nothing to render since we are redirecting
};

export default Profile;
