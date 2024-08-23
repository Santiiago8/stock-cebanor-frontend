/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react'
import { StockContext } from '../../context/StockContext';

export const AltaProductos = () => {
  const { addProduct } = useContext(StockContext);
  const [product, setProduct] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: [],
  });

  const [stores, setStores] = useState([]);
  const [maxStores, setMaxStores] = useState(0);

  // Cargar las sucursales desde la base de datos
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch('http://localhost:3000/stores/all');
        const data = await response.json();
        setStores(data);
        setMaxStores(data.length);
      } catch (error) {
        console.error('Error al cargar las sucursales:', error);
      }
    };

    fetchStores();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleStockChange = (index, e) => {
    const { name, value } = e.target;
    const updatedStock = product.stock.map((stockItem, i) =>
      i === index ? { ...stockItem, [name]: value } : stockItem
    );
    setProduct({ ...product, stock: updatedStock });
  }

  const handleAddStockField = () => {
    if (product.stock.length < maxStores) {
      setProduct({
        ...product,
        stock: [...product.stock, { store_id: '', stock_quantity: '' }],
      });
    } else {
      alert('No puedes añadir más campos de stock que el número de tiendas disponibles.');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct(product);
      alert('Producto creado exitosamente!');
      // Resetear form
      setProduct({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: [],
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al crear el producto');
    }
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGroup}>
        <label style={styles.label}>Nombre del Producto:</label>
        <input
          type="text"
          name="nombre"
          value={product.nombre}
          onChange={handleInputChange}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Descripción:</label>
        <textarea
          name="descripcion"
          value={product.descripcion}
          onChange={handleInputChange}
          style={styles.textarea}
        ></textarea>
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Precio:</label>
        <input
          type="number"
          name="precio"
          value={product.precio}
          onChange={handleInputChange}
          style={styles.input}
          required
        />
      </div>

      <div style={styles.stockGroup}>
        <label style={styles.label}>Stock por Tienda:</label>
        {product.stock.map((stockItem, index) => (
          <div key={index} style={styles.stockItem}>
            <select
              name="store_id"
              value={stockItem.store_id}
              onChange={(e) => handleStockChange(index, e)}
              style={styles.select}
            >
              <option value="">Seleccione una tienda</option>
              {stores.map((store) => (
                <option key={store.id} value={store.id} style={styles.option}>
                  {store.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="stock_quantity"
              placeholder="Cantidad en stock"
              value={stockItem.stock_quantity}
              onChange={(e) => handleStockChange(index, e)}
              style={styles.stockInput}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddStockField}
          style={styles.buttonAddStock}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Añadir Stock para otra tienda
        </button>
      </div>

      <button
        type="submit"
        style={styles.button}
        onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
      >
        Crear Producto
      </button>
    </form>
  )
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    width: '80vw',
    height: '50%',
    margin: '0 auto',
    borderRadius: '8px',
    position: 'relative',
  },
  formGroup: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '15px',
    width: '100%',
  },
  stockGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '15px',
    width: '100%',
  },
  stockItem: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
    gap: '15px',
    marginRight: '35px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    textAlign: 'left',
    flexBasis: '15%',
  },
  input: {
    flexBasis: '50%',
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    color: '#333',
  },
  option: {
    padding: '100px',
  },
  textarea: {
    flexBasis: '50%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    color: '#333',
    minHeight: '100px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
    position: 'absolute', // Añadido para posicionar el botón
    bottom: '0',           // Posicionar al fondo
    left: '20px',
  },
  buttonAddStock: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
    marginBottom: '15px'
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  th: {
    padding: '12px 15px',
    backgroundColor: '#007bff',
    color: 'white',
    textTransform: 'uppercase',
    fontSize: '14px',
    textAlign: 'left',
  },
  td: {
    padding: '12px 15px',
    borderBottom: '1px solid #ccc',
    color: '#333',
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
