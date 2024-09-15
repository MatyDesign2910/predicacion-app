import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Menu from './Menu';
import RegistroHoras from './RegistroHoras';
import GruposServicio from './GruposServicio';
import AdminDashboard from './AdminDashboard';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
    <React.Fragment>
      <CssBaseline />
    <Container maxWidth="sm" sx={{ p:0 }}>
    <Box sx={{ bgcolor: '#cfe8fc', height: 'auto', minHeight: '100vh', m: 0, p:0 }}>
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Menu isAdmin={isAdmin} /> : <Login onLogin={handleLogin} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/horas" element={isAuthenticated ? <RegistroHoras /> : <Login onLogin={handleLogin} />} />
        <Route path="/grupos" element={isAuthenticated ? <GruposServicio /> : <Login onLogin={handleLogin}/>} />
        <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
    </Box>
    </Container>
    </React.Fragment>
  );
};

export default App;
