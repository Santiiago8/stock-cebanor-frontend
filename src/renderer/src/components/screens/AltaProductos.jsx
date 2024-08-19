/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'

export const AltaProductos = () => {
  const [product, setProduct] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: [],
  });

  const [stores, setStores] = useState([]);

  // Cargar las sucursales desde la base de datos
  useEffect(() => {
      const fetchStores = async () => {
          try {
              const response = await fetch('http://localhost:3000/stores/all');
              const data = await response.json();
              setStores(data);
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
    setProduct({
      ...product,
      stock: [...product.stock, { store_id: '', stock_quantity: '' }],
    });
  }

  const handleSubmit = async (e) => {
    console.log(product);

    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/products/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Producto creado exitosamente!');
        //Resetear form
        setProduct({
          nombre: '',
          descripcion: '',
          precio: '',
          stock: [],
        });
      } else {
        alert('Hubo un error al crear el producto');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre del Producto:</label>
        <input
          type="text"
          name="nombre"
          value={product.nombre}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={product.descripcion}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div>
        <label>Precio:</label>
        <input
          type="number"
          name="precio"
          value={product.precio}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label>Stock por Tienda:</label>
        {product.stock.map((stockItem, index) => (
          <div key={index}>
            <select
              name="store_id"
              value={stockItem.store_id}
              onChange={(e) => handleStockChange(index, e)}
            >
              <option value="">Seleccione una tienda</option>
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
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
            />
          </div>
        ))}
        <button type="button" onClick={handleAddStockField}>
          Añadir Stock para otra tienda
        </button>
      </div>

      <button type="submit">Crear Producto</button>
    </form>
  )
}
