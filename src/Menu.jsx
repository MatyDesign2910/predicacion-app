import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistroHoras from './RegistroHoras';
import GruposServicio from './GruposServicio';
import AdminDashboard from './AdminDashboard';

const Menu = ({ isAdmin }) => {
  const [view, setView] = useState('menu');
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

  return (
    <div>
      <h1>Bienvenido a la aplicación de predicación</h1>
      <nav>
        <button onClick={() => handleNavigation('horas')}>Anotar Horas</button>
        <button onClick={() => handleNavigation('grupos')}>Ver Grupos de Servicio</button>
        {isAdmin && <button onClick={() => handleNavigation('admin')}>Admin Dashboard</button>}
        <button onClick={handleLogout}>Cerrar sesión</button>
      </nav>
      {view === 'horas' && <RegistroHoras />}
      {view === 'grupos' && <GruposServicio />}
      {view === 'admin' && isAdmin && <AdminDashboard />}
    </div>
  );
};

export default Menu;
