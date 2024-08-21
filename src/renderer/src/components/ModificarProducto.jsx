/* eslint-disable prettier/prettier */
import React, { useContext, useState } from 'react';
import { StockContext } from '../context/StockContext';

export const ModificarProducto = ({ productId, onClose }) => {
  const { products, updateStock } = useContext(StockContext);
  const product = products.find(p => p.id === productId);

  const [nombre, setNombre] = useState(product?.name || '');
  const [descripcion, setDescripcion] = useState(product?.description || '');
  const [precio, setPrecio] = useState(product?.price || '');
  const [stockData, setStockData] = useState(product?.stockData || []);

  const handleStockChange = (storeId, value) => {
    setStockData(stockData.map(store =>
      store.store_id === storeId ? { ...store, stock: value } : store
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    stockData.forEach(store => {
      updateStock(productId, store.store_id, store.stock);
    });
    onClose();
  };

  return (
    <div style={styles.modal}>
      <h2 style={styles.title}>Modificar Producto</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Nombre: </label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Descripción: </label>
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Precio:</label>
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          style={styles.input}
        />

        <h3>Stock por Sucursal</h3>
        {stockData.map(store => (
          <div key={store.store_id} style={styles.stockRow}>
            <label style={styles.label}>{store.store_name}</label>
            <input
              type="number"
              value={store.stock}
              onChange={(e) => handleStockChange(store.store_id, e.target.value)}
              style={styles.input}
            />
          </div>
        ))}
        <button type="submit" style={styles.button}>Guardar Cambios</button>
        <button type="button" onClick={onClose} style={styles.cancelButton}>Cancelar</button>
      </form>
    </div>
  );
};

const styles = {
  modal: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    width: '400px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    color: 'blue',
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  input: {
    padding: '8px',
    marginBottom: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  stockRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '16px',
  },
  cancelButton: {
    padding: '10px',
    backgroundColor: '#ccc',
    color: '#000',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  },
  title: {
    color: 'blue',
    marginBottom: '10px',
  }
};
