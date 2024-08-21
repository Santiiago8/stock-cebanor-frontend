/* eslint-disable prettier/prettier */
import React, { useContext, useMemo, useState } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import { StockContext } from '../../context/StockContext';
import { ModificarProducto } from '../ModificarProducto';

export const StockPage = () => {
  const { products, loading } = useContext(StockContext);
  const [searchInput, setSearchInput] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const data = useMemo(() => products, [products]);

  const columns = useMemo(() => [
    { Header: 'Nombre', accessor: 'name' },
    { Header: 'Descripción', accessor: 'description' },
    { Header: 'Precio', accessor: 'price' },
    {
      Header: 'Stock',
      accessor: 'stockData',
      Cell: ({ cell: { value } }) => (
        value.map(store => (
          <div key={store.store_id}>
            {store.store_name}: {store.stock}
          </div>
        ))
      ),
    },
    { Header: 'Sucursales', accessor: 'stores' },
    {
      Header: 'Acciones',
      accessor: 'actions',
      Cell: ({ row }) => (
        <button  onClick={() => {
            console.log('Producto:', row.original);
            handleEditClick(row.original.id);
          }}
        >
          Editar
        </button>
      ),
    },
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

  const handleEditClick = (productId) => {
    console.log('Producto seleccionado:', productId);
    setSelectedProduct(productId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
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

      {isModalOpen && selectedProduct && (
        <div style={styles.modalOverlay}>
          <ModificarProducto
            productId={selectedProduct}
            onClose={handleCloseModal}
          />
        </div>
      )}
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
    position: 'relative',
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
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
}
