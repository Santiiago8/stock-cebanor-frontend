/* eslint-disable prettier/prettier */
import React, { useState, useMemo } from 'react';
import { useTable, useGlobalFilter } from 'react-table';

export const StockPage = () => {
  // Datos hardcodeados
  const hardcodedProducts = [
    { name: 'Producto A', price: 10.0, stock: 100, stores: 'Sucursal 1' },
    { name: 'Producto B', price: 20.0, stock: 50, stores: 'Sucursal 2' },
    { name: 'Producto C', price: 30.0, stock: 75, stores: 'Sucursal 1, Sucursal 2' },
    // Agrega más productos hardcodeados si es necesario
  ];

  const [products] = useState(hardcodedProducts);
  const [searchInput, setSearchInput] = useState('');

  const data = useMemo(() => products, [products]);

  const columns = useMemo(() => [
    { Header: 'Nombre', accessor: 'name' },
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

  useMemo(() => {
    setGlobalFilter(searchInput);
  }, [searchInput, setGlobalFilter]);

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
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
  tableContainer: {
    flex: 1,
    overflowY: 'auto',
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
  // Agrega más estilos según sea necesario
};
