import react from "react";
import { useState } from "react";
import UpdateModal from "./UpdateModal";

const ReadWarehouseTable = ({ warehouse, warehouses }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      {warehouses.map((warehouse) => (
        <tr key={warehouse.id}>
          <td>{warehouse.id}</td>
          <td>{warehouse.name}</td>
          <td>{warehouse.location}</td>
        </tr>
      ))}
    </>
  );
};

export default ReadWarehouseTable;
