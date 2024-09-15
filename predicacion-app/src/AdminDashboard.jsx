import React, { useState, useEffect } from 'react';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

const AdminDashboard = () => {
  const [formularios, setFormularios] = useState([]);
  const [filteredFormularios, setFilteredFormularios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
        setFilteredFormularios(formulariosCombinados);
      })
      .catch((error) => console.error('Error al cargar los datos:', error));
  }, []);

  useEffect(() => {
    // Filtrar los formularios cuando cambie el término de búsqueda
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = formularios.filter((formulario) => 
      (formulario.nombre && formulario.nombre.toLowerCase().includes(lowercasedFilter)) || 
      (formulario.id && formulario.id.toString().includes(lowercasedFilter)) || 
      (formulario.grupo && formulario.grupo.toString().toLowerCase().includes(lowercasedFilter))
    );
    setFilteredFormularios(filtered);
  }, [searchTerm, formularios]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['ID', 'Nombre', 'Grupo', 'Participó', 'Precursor', 'Horas', 'Estudios', 'Revisitas']],
      body: filteredFormularios.map(formulario => [
        formulario.id,
        formulario.nombre,
        formulario.grupo,
        formulario.participo ? 'Sí' : 'No',
        formulario.precursor ? 'Sí' : 'No',
        formulario.horas,
        formulario.estudios,
        formulario.revisitas
      ]),
    });
    doc.save('formularios.pdf');
  };

  return (
    <div>
              <div style={{float:'right', marginTop:10}}>
              <ButtonGroup
                disableElevation
                variant="contained"
                aria-label="Disabled button group"
                color="success"
                >
        <CSVLink
          data={filteredFormularios}
          headers={[
            { label: 'ID', key: 'id' },
            { label: 'Nombre', key: 'nombre' },
            { label: 'Grupo', key: 'grupo' },
            { label: 'Participó', key: 'participo' },
            { label: 'Precursor', key: 'precursor' },
            { label: 'Horas', key: 'horas' },
            { label: 'Estudios', key: 'estudios' },
            { label: 'Revisitas', key: 'revisitas' }
          ]}
          filename="formularios.csv"
        >
          <Button>Excel</Button>
        </CSVLink>
        <Button onClick={exportToPDF} color="error">PDF</Button>
        </ButtonGroup>
      </div>
      <h2>Panel de Administrador</h2>
      <h3>Formularios Enviados</h3>
      <TextField
        label="Buscar"
        variant="outlined"
        sx={{ bgcolor: '#fff' }}
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Grupo</TableCell>
              <TableCell>Participó</TableCell>
              <TableCell>Precursor</TableCell>
              <TableCell>Horas</TableCell>
              <TableCell>Estudios</TableCell>
              <TableCell>Revisitas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFormularios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((formulario) => (
              <TableRow key={formulario.id}>
                <TableCell>{formulario.id}</TableCell>
                <TableCell>{formulario.nombre}</TableCell>
                <TableCell>{formulario.grupo}</TableCell>
                <TableCell>{formulario.participo ? 'Sí' : 'No'}</TableCell>
                <TableCell>{formulario.precursor ? 'Sí' : 'No'}</TableCell>
                <TableCell>{formulario.horas}</TableCell>
                <TableCell>{formulario.estudios}</TableCell>
                <TableCell>{formulario.revisitas}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredFormularios.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default AdminDashboard;
