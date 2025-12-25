
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Predict from './pages/Predict';
import Result from './pages/Result';
import Info from './pages/Info';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.body.classList.add('navy-bg');
    } else {
      document.body.classList.remove('navy-bg');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode} user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={user ? <Home darkMode={darkMode} /> : <Navigate to="/login" />} />
          <Route path="/predict" element={user ? <Predict darkMode={darkMode} user={user} /> : <Navigate to="/login" />} />
          <Route path="/result" element={user ? <Result darkMode={darkMode} /> : <Navigate to="/login" />} />
          <Route path="/info" element={<Info darkMode={darkMode} />} />
          <Route path="/profile" element={user ? <Profile darkMode={darkMode} user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login darkMode={darkMode} onLogin={setUser} />} />
          <Route path="/signup" element={<SignUp darkMode={darkMode} onLogin={setUser} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
