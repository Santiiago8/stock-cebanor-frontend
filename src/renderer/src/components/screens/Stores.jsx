/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'

export const Stores = () => {
  const [stores, setStores] = useState([]);
  const [newStoreName, setNewStoreName] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [storeToDelete, setStoreToDelete] = useState(null);

  useEffect(() => {
    fetchStore();
  }, []);

  const fetchStore = async () => {
    try {
      const response = await fetch('http://localhost:3000/stores/all');
      const data = await response.json();
      setStores(data);
    } catch (error) {
      console.error('Error fetching store', error);
    }
  };

  const handleAddStore = async () => {
    if (newStoreName.trim() === '') return;

    try {
      const response = await fetch('http://localhost:3000/stores/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newStoreName }),
      })

      if (response.ok) {
        fetchStore();
        setNewStoreName('');
      } else {
        console.error('Error al crear tienda ');
      }
    } catch (error) {
      console.error('Error al crear tienda');
    }
  }

  const handleDeleteStore = async (storeId) => {
    try {
      const response = await fetch(`http://localhost:3000/stores/${storeId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchStore();
        setShowConfirmation(false);
      } else {
        console.error('Error al eliminar tienda');
      }
    } catch (error) {
      console.error('Error al eliminar tienda ', error);
    }
  };

  const confirmDelete = (storeId) => {
    setShowConfirmation(true);
    setStoreToDelete(storeId);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setStoreToDelete(null);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gestión de Tiendas</h1>

      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Nombre de la tienda"
          value={newStoreName}
          onChange={(e) => setNewStoreName(e.target.value)}
          style={styles.input}
        />
        <button
          onClick={handleAddStore}
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Crear Tienda
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td style={styles.td}>{store.name}</td>
              <td style={styles.td}>
                <button
                  onClick={() => confirmDelete(store.id)}
                  style={styles.deleteButton}
                  onMouseOver={(e) => (e.target.style.backgroundColor = styles.deleteButtonHover.backgroundColor)}
                  onMouseOut={(e) => (e.target.style.backgroundColor = styles.deleteButton.backgroundColor)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showConfirmation && (
        <div style={styles.confirmationDialog}>
          <p style={styles.dialogText}>¿Estás seguro de que quieres eliminar esta tienda?</p>
          <button
            onClick={() => handleDeleteStore(storeToDelete)}
            style={styles.confirmButton}
          >
            Confirmar
          </button>
          <button
            onClick={cancelDelete}
            style={styles.cancelButton}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    margin: '0 auto',
    padding: '20px',
    width: '80vw',
    height: '100%',
    boxSizing: 'border-box',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginRight: '10px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#218838',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  th: {
    padding: '12px 15px',
    textAlign: 'left',
    backgroundColor: '#007bff',
    color: 'white',
    textTransform: 'uppercase',
    fontSize: '14px',
  },
  td: {
    fontSize: '17px',
    padding: '12px 15px',
    textAlign: 'left',
    borderBottom: '1px solid #ccc',
  },
  deleteButton: {
    padding: '6px 12px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  deleteButtonHover: {
    backgroundColor: '#c82333',
  },
  confirmationDialog: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
    textAlign: 'center',
  },
  dialogText: {
    marginBottom: '20px',
    color: '#333',
  },
  confirmButton: {
    padding: '8px 16px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginRight: '10px',
  },
  cancelButton: {
    padding: '8px 16px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};
