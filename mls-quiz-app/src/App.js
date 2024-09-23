import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/Leaderboard" element={<Leaderboard />} />
      <Route path="/Quiz" element={<Quiz />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />

      
      <Route path="/student-home" element={<StudentHome />} />
      <Route path="/teacher-home" element={<TeacherHome />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/create-quiz" element={<QuizCreator />} />
      </Route>
    </Routes>
  );
}

export default App;
