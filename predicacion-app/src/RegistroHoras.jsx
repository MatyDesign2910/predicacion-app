import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

const RegistroHoras = () => {
    const label = { inputProps: { 'aria-label': 'Participo del ministerio?' } };
    const [formulario, setFormulario] = useState({
        nombre: '',
        grupo: '',
        participo: false,
        precursor: false,
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
            precursor: false,
            horas: '',
            estudios: '',
            revisitas: ''
        });

        alert('Formulario enviado y guardado correctamente.');
    };

    return (
        <Box
            component="form"
            fullWidth
            noValidate
            autoComplete="off"
        >
            <form onSubmit={handleSubmit}>
            <h2>Enviar informe de servicio</h2>
                <label>
                    <TextField id="nombre" label="Nombre" sx={{ mt: 1, width: '100%', bgcolor: '#fff' }} variant="outlined" type="text" fullWidth
                        value={formulario.nombre}
                        onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
                        required />
                </label>
                <label>
                    <TextField id="grupo" label="Grupo" sx={{ mt: 1, width: '100%', bgcolor: '#fff' }} variant="outlined" type="text" fullWidth
                        value={formulario.grupo}
                        onChange={(e) => setFormulario({ ...formulario, grupo: e.target.value })}
                        required />
                </label>

                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <InputLabel sx={{ mt: 2 }} >
                        <Checkbox {...label} defaultChecked value={formulario.participo}
          checked={formulario.participo}
          onChange={(e) => setFormulario({ ...formulario, participo: e.target.checked })}
                        /> Participo?
                    </InputLabel>

                    <InputLabel sx={{ mt: 2, ml:3 }} >
                        <Checkbox {...label} defaultChecked value={formulario.precursor}
          checked={formulario.precursor}
          onChange={(e) => setFormulario({ ...formulario, precursor: e.target.checked })}
                        /> Precursor(a)?
                    </InputLabel>
                </Box>
                {formulario.precursor && (
                <>
                <label>
                    <TextField id="horas" label="Horas" sx={{ mt: 1, width: '100%', bgcolor: '#fff' }} variant="outlined" type="number" fullWidth
                        value={formulario.horas}
                        onChange={(e) => setFormulario({ ...formulario, horas: e.target.value })}
                        />
                </label>
                <label>
                    <TextField id="estudios" label="Estudios" sx={{ mt: 1, width: '100%', bgcolor: '#fff' }} variant="outlined" type="number" fullWidth
                        value={formulario.estudios}
                        onChange={(e) => setFormulario({ ...formulario, estudios: e.target.value })}
                        />
                </label>
                <label>
                    <TextField id="revisitas" label="Revisitas" sx={{ mt: 1, width: '100%', bgcolor: '#fff' }} variant="outlined" type="number" fullWidth
                        value={formulario.revisitas}
                        onChange={(e) => setFormulario({ ...formulario, revisitas: e.target.value })}
                        />
                </label>
                </>
)}
                <Button variant="contained" type="submit" sx={{ mt: 3, width: '100%' }} onClick={handleSubmit}>Enviar</Button>
            </form>
        </Box>
    );
};

export default RegistroHoras;
