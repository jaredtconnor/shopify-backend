import react from 'react';
import { useState } from 'react';

const WarehouseRows = ({ warehouse, warehouses, handleWarehouseDelete }) => {
  return (
    <>
      {warehouses.map((warehouse) => (
        <tr key={warehouse.id}>
          <td>{warehouse.id}</td>
          <td>{warehouse.name}</td>
          <td>{warehouse.location}</td>
          <td>
            <button
              className="btn btn-outline-danger btn-sm mr-2 m-1"
              onClick={() => handleWarehouseDelete(warehouse.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default WarehouseRows;
