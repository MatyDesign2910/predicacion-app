import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
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

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Admin:
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
