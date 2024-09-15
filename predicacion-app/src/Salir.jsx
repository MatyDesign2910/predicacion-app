import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpiar los datos de sesión o token
    localStorage.removeItem('authToken');  // O cualquier clave que uses para guardar el token

    // Redirigir al usuario a la página de inicio de sesión
    navigate('/login');
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Logout;
