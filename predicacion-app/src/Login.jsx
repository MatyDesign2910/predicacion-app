import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const Login = ({ onLogin }) => {
  const label = { inputProps: { 'aria-label': 'Admin' } };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar lógica de autenticación real
    fetch('/usuarios.json')
      .then(response => response.json())
      .then(data => {
        const user = data.users.find(user => user.username === username && user.password === password);
        if (user) {
          localStorage.setItem('authToken', 'fakeToken'); // Simulación de token
          localStorage.setItem('userType', user.type); // 'admin' o 'user'
          localStorage.setItem('username', username); // Guardar el nombre de usuario si es necesario
          onLogin(user.type === 'admin');
          navigate('/');
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      })
      .catch(error => console.error('Error al autenticar:', error));
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box
      component="form"
      fullWidth
      noValidate
      autoComplete="off"
      sx={{ m: 3, width: '88%', mt: 0}}
    >
      <h1 sx={{ mt: 0}}>
        <br />
      Bienvenido(a), a tu programa de predicacion
      </h1>
      <div>
        <TextField id="username" label="Usuario" sx={{ mt: 3, width: '100%', bgcolor: '#fff' }} variant="outlined" type="text" fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            },
          }}
          required />
      </div>
      <div>
        <FormControl sx={{ mt: 3, width: '100%', bgcolor: '#fff' }} variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password" label="Clave"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div>
        <InputLabel htmlFor="admin" sx={{ mt: 2 }} >
          <Checkbox {...label} defaultChecked checked={isAdmin} id='admin'
            onChange={(e) => setIsAdmin(e.target.checked)}
          /> Admin
        </InputLabel>
      </div>
      <div>
        <Button variant="contained" type="submit" sx={{ mt: 3, width: '100%' }} onClick={handleSubmit}>Ingresar</Button>
      </div>
    </Box>
  );
};

export default Login;
