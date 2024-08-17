/* eslint-disable prettier/prettier */
import React, { useState, useMemo, useEffect } from 'react';
import { useTable, useGlobalFilter } from 'react-table';

export const StockPage = () => {
  // Estado para los productos
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        // Mapear los datos para adaptarlos a la estructura de la tabla
        const mappedProducts = data.map(product => ({
          name: product.nombre,
          description: product.descripcion,
          price: product.precio,
          stock: product.stores.map(store => `${store.store_name}: ${store.stock}`).join(', '),
          stores: product.stores.map(store => store.store_name).join(', '),
        }));
        setProducts(mappedProducts);
        console.log('estos son los productos: ', mappedProducts);
      } catch (error) {
        console.error('algo salió mal: ', error);
      }
    };

    fetchProducts();
  }, []);

  const data = useMemo(() => products, [products]);

  const columns = useMemo(() => [
    { Header: 'Nombre', accessor: 'name' },
    { Header: 'Descripción', accessor: 'description' },
    { Header: 'Precio', accessor: 'price' },
    { Header: 'Stock', accessor: 'stock' },
    { Header: 'Sucursales', accessor: 'stores' },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    setGlobalFilter(e.target.value);
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchInput}
        onChange={handleSearchChange}
        style={styles.searchInput}
      />
      <table {...getTableProps()} style={styles.table}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th key={column.id} {...column.getHeaderProps()} style={styles.header}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr key={row.id} {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td key={cell.column.id} {...cell.getCellProps()} style={styles.cell}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    width: '100vh',
    height: '100vh',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  },
  searchInput: {
    marginBottom: '10px',
    padding: '10px',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  header: {
    padding: '12px',
    textAlign: 'left',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  cell: {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
};
