/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { useUser } from '../context/userContext';
import Navbar from '../components/Navbar';
import Login from '../components/Login';
import { Sidebar } from '../components/Sidebar';
import { StockPage } from '../components/screens/StockPage';
import { AltaProductos } from '../components/screens/AltaProductos';
import { AltaUsuarios } from '../components/screens/AltaUsuarios';
import { Stores } from '../components/screens/Stores';
import { Bienvenida } from '../components/Bienvenida';

const ProtectedLayout = () => {
  const [selectedOption, setSelectedOption] = useState('Opción 1');

  const renderContent = () => {
    switch (selectedOption) {
      case 'Opción 1':
        return <StockPage />;
      case 'Opción 2':
        return <AltaProductos />;
      case 'Opción 3':
        return <AltaUsuarios />;
      case 'Opción 4':
        return <Stores />;
      default:
        return <Bienvenida />;
    }
  };

  return (
    <div style={styles.layout}>
      <Navbar />
      <div style={styles.container}>
        <Sidebar setSelectedOption={setSelectedOption} />
        <div style={styles.content}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <ProtectedLayout>{children}</ProtectedLayout>;
}

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          path='/bienvenida'
          element={
            <ProtectedRoute />
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  container: {
    display: 'flex',
    flex: 1,
  },
  content: {
    flex: 1,
    padding: '20px',
    boxSizing: 'border-box',
    overflowY: 'auto',
  },
};
