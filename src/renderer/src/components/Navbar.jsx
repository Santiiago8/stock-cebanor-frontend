/* eslint-disable prettier/prettier */
import React from 'react';
import { useUser } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import '../styles/navbar.css'

const Navbar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    alert('Session cerrada')
  };

  return (
    <nav className='navbar'>
      <div className='title-nav'>
        <h3>CEBANOR</h3>
      </div>
      <div className='user-data'>
        <span>{user.nombre} {user.apellido}</span>
        <button onClick={handleLogout} className='btn-navbar'>
          Cerrar Sesión
        </button>
      </div>
    </nav>

  );
};

export default Navbar;
