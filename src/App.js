import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Register from './pages/Register';
import Quiz from './pages/Quiz';
import QuizCreator from './components/QuizCreator';
import About from './pages/About';
import Leaderboard from './pages/Leaderboard';
import ResourcesPage from './pages/Resources';
import StudentHome from './components/StudentHome'; 
import TeacherHome from './components/TeacherHome'; 
import Profile from './pages/Profile';
import Settings from './components/Settings';
import Notifications from './components/Notifications';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Quizzes from './pages/Quizzes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/ContactUs" element={<ContactUs />} />
      <Route path="/quizzes" element={<Quizzes />} />
      

      <Route path="/about" element={<About />} />
      <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
      <Route path="/Leaderboard" element={<Leaderboard />} />
      <Route path="/Quiz" element={<Quiz />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/Notifications" element={<Notifications />} />

      
      <Route path="/student-home" element={<StudentHome />} />
      <Route path="/teacher-home" element={<TeacherHome />} />
      

      <Route element={<ProtectedRoute />}>
      <Route path="/quiz/:quizId" element={<Quiz />} />
        <Route path="/create-quiz" element={<QuizCreator />} />
      </Route>
    </Routes>
  );
}

export default App;
