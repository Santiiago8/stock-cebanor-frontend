/* eslint-disable prettier/prettier */
import React, { useState } from 'react';

export const AltaUsuarios = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear el objeto de usuario
    const nuevoUsuario = {
      nombre,
      apellido,
      contrasena,
      isSuperAdmin,
    };

    try {
      // Realizar la solicitud POST al backend
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoUsuario),
      });
      console.log('este es el usuario: ', nuevoUsuario);

      if (response.ok) {
        alert('Usuario creado exitosamente');
        // Limpiar el formulario después de la creación
        setNombre('');
        setApellido('');
        setContrasena('');
        setIsSuperAdmin(false);
      } else {
        alert('Hubo un error al crear el usuario');
      }
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      alert('Hubo un error al crear el usuario');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Registrar Nuevo Usuario</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Apellido:</label>
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Contraseña:</label>
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>SuperAdmin:</label>
            <input
              type="checkbox"
              checked={isSuperAdmin}
              onChange={(e) => setIsSuperAdmin(e.target.checked)}
              style={styles.checkbox}
            />
          </div>
          <button type="submit" style={styles.button}>Crear Usuario</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '80vw',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  formContainer: {
    padding: '20px',
    maxWidth: '400px',
    margin: '0 auto',
    boxSizing: 'border-box',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',

  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  checkbox: {
    transform: 'scale(1.5)',
    marginLeft: '10px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  title: {
    color: 'blue',
    marginBottom: '10px',
  },
};
