import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Menu from './Menu';
import RegistroHoras from './RegistroHoras';
import GruposServicio from './GruposServicio';
import AdminDashboard from './AdminDashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const userType = localStorage.getItem('userType');
    
    if (authToken) {
      setIsAuthenticated(true);
      setIsAdmin(userType === 'admin');
    }
  }, []);

  const handleLogin = (adminStatus) => {
    setIsAuthenticated(true);
    setIsAdmin(adminStatus);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Menu isAdmin={isAdmin} /> : <Login onLogin={handleLogin} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/horas" element={isAuthenticated ? <RegistroHoras /> : <Login onLogin={handleLogin} />} />
        <Route path="/grupos" element={isAuthenticated ? <GruposServicio /> : <Login onLogin={handleLogin}/>} />
        <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
};

export default App;
