/* eslint-disable prettier/prettier */
import React from 'react'
import { Link } from 'react-router-dom';

export const Sidebar = ({ setSelectedOption }) => {
  return (
    <div style={styles.sidebar}>
      <Link to='' style={styles.link} onClick={() => setSelectedOption('Opción 1')}>Opcion 1</Link>
      <Link to='' style={styles.link} onClick={() => setSelectedOption('Opción 2')}>Opcion 2</Link>
      <Link to='' style={styles.link} onClick={() => setSelectedOption('Opción 3')}>Opcion 3</Link>
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
  }
}
