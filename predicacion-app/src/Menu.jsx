import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistroHoras from './RegistroHoras';
import GruposServicio from './GruposServicio';
import AdminDashboard from './AdminDashboard';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const Menu = ({ isAdmin }) => {
  const [view, setView] = useState('horas');
  const navigate = useNavigate();

  const handleNavigation = (section) => {
    setView(section);
    // Redirigir a la vista correspondiente si es necesario
  };

  const handleLogout = () => {
    // Limpiar los datos de sesión o token
    localStorage.removeItem('authToken');  // O cualquier clave que uses para guardar el token

    // Redirigir al usuario a la página de inicio de sesión
    navigate('/login');
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      component="form"
      fullWidth
      noValidate
      autoComplete="off"
      sx={{ m: 3, width: '90%', mt: 0 }}
    >

      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable auto tabs example"
        sx={{ m: 0, mb: 3, mt: 1 }}
      >
        <Tab onClick={() => handleNavigation('horas')} label="Informe">Informe</Tab>
        <Tab onClick={() => handleNavigation('grupos')} label="Ver grupos">Ver grupos</Tab>
        {isAdmin && <Tab onClick={() => handleNavigation('admin')} label="Administrador">Administrador</Tab>}
        <Tab onClick={handleLogout} label="Salir">Salir</Tab>
      </Tabs>
      {view === 'horas' && <RegistroHoras />}
      {view === 'grupos' && <GruposServicio />}
      {view === 'admin' && isAdmin && <AdminDashboard />}
    </Box>
  );
};

export default Menu;
