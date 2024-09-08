import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [formularios, setFormularios] = useState([]);

  useEffect(() => {
    // Cargar los datos del JSON
    fetch('/formularios.json')
      .then((response) => response.json())
      .then((data) => {
        // Obtener datos guardados en localStorage
        const storedData = localStorage.getItem('formularios');
        const formulariosLocalStorage = storedData ? JSON.parse(storedData) : [];

        // Combinar los datos del JSON con los de localStorage
        const formulariosCombinados = [...data, ...formulariosLocalStorage];
        setFormularios(formulariosCombinados);
      })
      .catch((error) => console.error('Error al cargar los datos:', error));
  }, []);

  return (
    <div>
      <h2>Panel de Administrador</h2>
      <h3>Formularios Enviados</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Grupo</th>
            <th>Participó</th>
            <th>Horas</th>
            <th>Estudios</th>
            <th>Revisitas</th>
          </tr>
        </thead>
        <tbody>
          {formularios.map((formulario) => (
            <tr key={formulario.id}>
              <td>{formulario.id}</td>
              <td>{formulario.nombre}</td>
              <td>{formulario.grupo}</td>
              <td>{formulario.participo ? 'Sí' : 'No'}</td>
              <td>{formulario.horas}</td>
              <td>{formulario.estudios}</td>
              <td>{formulario.revisitas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
