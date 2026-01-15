import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/EliteToast';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
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
import Settings from './pages/Settings';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Assessments from './pages/Assessments';
import LandingPage from './pages/LandingPage';
import EditQuiz from './pages/EditQuiz';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/Leaderboard" element={<Leaderboard />} />
          <Route path="/quiz" element={<Assessments />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/quiz/:quizId" element={<Quiz />} />
            <Route path="/create-quiz" element={<QuizCreator />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/student-home" element={<StudentHome />} />
            <Route path="/teacher-home" element={<TeacherHome />} />
            <Route path="/edit-quiz/:quizId" element={<EditQuiz />} />
          </Route>
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
