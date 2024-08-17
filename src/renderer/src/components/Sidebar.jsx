/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';

export const Sidebar = ({ setSelectedOption }) => {
  const { user } = useContext(UserContext);

  return (
    <div style={styles.sidebar}>
      <Link to='' style={styles.link} onClick={() => setSelectedOption('Opción 1')}>Stock General</Link>
      <Link to='' style={styles.link} onClick={() => setSelectedOption('Opción 2')}>Opcion 2</Link>
      <Link
        to=''
        style={user.isSuperAdmin ? styles.link : { ...styles.link, ...styles.linkDisabled }}
        onClick={() => user.isSuperAdmin && setSelectedOption('Opción 3')}
        disabled={!user.isSuperAdmin}
      >
        Alta Usuarios
      </Link>
      <Link to='' style={styles.link} onClick={() => setSelectedOption('Opción 4')}>Opcion 4</Link>
    </div>
  )
}

const styles = {
  sidebar: {
    width: '200px',
    backgroundColor: '#333',
    height: '92vh',
    padding: '10px',
    boxSizing: 'border-box',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    marginTop: '10px',
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#444',
    textAlign: 'center',
    cursor: 'pointer',
  },
  linkDisabled: {
    backgroundColor: '#555', // Un tono más claro para indicar que está desactivado
    cursor: 'not-allowed',
    opacity: 0.6,
  }
}
