import React, { createContext, useEffect, useState } from "react";

// Context
export const StockContext = createContext();

// Provider del context
export const StockProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carga del stock
  const fetchStock = async () => {
    try {
      const response = await fetch('http://localhost:3000/products');
      const data = await response.json();
      const mappedProducts = data.map(product => ({
        id: product.id,
        name: product.nombre,
        description: product.descripcion,
        price: product.precio,
        stockData: product.stores.map(store => ({
          store_id: store.store_id,
          store_name: store.store_name,
          stock: store.stock,
        })),
        stores: product.stores.map(store => store.store_name).join(', '),
      }));
      setProducts(mappedProducts);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar stock: ', error);
      setLoading(false);
    }
  };


  // Actualizar stock después de un put
  const updateStock = async (productId, storeId, quantity) => {
    console.log('data -> ', productId, storeId, quantity);

    try {
      const response = await fetch('http://localhost:3000/product-stocks/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          storeId,
          quantity,
        }),
      });

      if (response.ok) {
        fetchStock(); // Volver a cargar el stock actualizado
      } else {
        console.error('Error al actualizar el stock');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    fetchStock();
  }, []);

  return (
    <StockContext.Provider value={{ products, loading, updateStock }}>
      {children}
    </StockContext.Provider>
  );
};
