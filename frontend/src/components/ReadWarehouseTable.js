import react from "react";
import { useState } from "react";
import UpdateModal from "./UpdateModal";

const ReadWarehouseTable = ({ warehouse, warehouses, handleDelete, warehouseInfo, setWarehouseInfo}) => {

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
              onClick={() => handleDelete(warehouse.id)}
            >
              Delete
            </button> 
          </td>
        </tr>
      ))}
    </>
  );
};

export default ReadWarehouseTable;
