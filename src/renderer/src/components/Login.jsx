/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';

const Login = () => {
  const [nombre, setNombre] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Realiza la solicitud al backend para verificar el usuario
    try {
      console.log("Enviando solicitud a: ", "http://localhost:3000/users/login");
      console.log("Datos enviados: ", { nombre, contrasena });

      const response = await axios.post('http://localhost:3000/users/login', { nombre, contrasena,  });
      const userData = response.data;
      console.log('Datos del usuario recibidos:', userData.user);

      if (userData) {
        login(userData.user); //Guarda el estado del usuario
        alert('Bienvenido!');
        navigate('/bienvenida');
      } else {
        alert('Nombre de usuario o contrasena incorrectos.')
      }

    } catch (error) {
      console.error('Error al conectar con el servidor: ', error);
      alert('Nombre de usuario o contrasena incorrectos.')
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>Iniciar Sesión</h2>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre de usuario"
          required
          autoFocus
          style={styles.input}
        />
        <input
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          placeholder="Contraseña"
          required
          style={styles.input}
        />
        <button
          type="submit"
          style={styles.button}
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    width: '200px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },

  title: {
    color: 'blue',
    marginBottom: '10px',
  },
};

export default Login;
