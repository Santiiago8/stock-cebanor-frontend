/* eslint-disable prettier/prettier */
import React, { useContext, useMemo } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import { StockContext } from '../../context/StockContext'; // Asegúrate de que la ruta sea correcta

export const StockPage = () => {
  const { products, loading } = useContext(StockContext); // Usa el contexto para obtener productos y estado de carga
  const [searchInput, setSearchInput] = React.useState('');

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

  if (loading) {
    return <div style={styles.loading}>Cargando...</div>;
  }

  if (!products.length) {
    return <div style={styles.noProducts}>No hay productos disponibles</div>;
  }

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
    width: '80vw',
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
  loading: {
    padding: '20px',
    fontSize: '18px',
    textAlign: 'center',
  },
  noProducts: {
    padding: '20px',
    fontSize: '18px',
    textAlign: 'center',
  },
};
