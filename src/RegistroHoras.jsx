import React, { useState } from 'react';

const RegistroHoras = () => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    grupo: '',
    participo: false,
    horas: '',
    estudios: '',
    revisitas: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Obtener formularios previos de localStorage
    const storedData = localStorage.getItem('formularios');
    const formulariosPrevios = storedData ? JSON.parse(storedData) : [];

    // Crear un nuevo formulario con un ID único
    const nuevoFormulario = {
      ...formulario,
      id: Date.now(),
    };

    // Guardar el nuevo formulario en localStorage
    const formulariosActualizados = [...formulariosPrevios, nuevoFormulario];
    localStorage.setItem('formularios', JSON.stringify(formulariosActualizados));

    // Limpiar el formulario
    setFormulario({
      nombre: '',
      grupo: '',
      participo: false,
      horas: '',
      estudios: '',
      revisitas: ''
    });

    alert('Formulario enviado y guardado correctamente.');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          value={formulario.nombre}
          onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
        />
      </label>
      <label>
        Grupo:
        <input
          type="number"
          value={formulario.grupo}
          onChange={(e) => setFormulario({ ...formulario, grupo: e.target.value })}
        />
      </label>
      <label>
        Participó:
        <input
          type="checkbox"
          checked={formulario.participo}
          onChange={(e) => setFormulario({ ...formulario, participo: e.target.checked })}
        />
      </label>
      <label>
        Horas:
        <input
          type="number"
          value={formulario.horas}
          onChange={(e) => setFormulario({ ...formulario, horas: e.target.value })}
        />
      </label>
      <label>
        Estudios:
        <input
          type="number"
          value={formulario.estudios}
          onChange={(e) => setFormulario({ ...formulario, estudios: e.target.value })}
        />
      </label>
      <label>
        Revisitas:
        <input
          type="number"
          value={formulario.revisitas}
          onChange={(e) => setFormulario({ ...formulario, revisitas: e.target.value })}
        />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default RegistroHoras;
