import react from "react";
import { useState } from "react";
import UpdateModal from "./UpdateModal";

const ReadTable = ({ product, products, handleDelete }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      {products.map((product) => (
        <tr key={product.id}>
          <td>{product.id}</td>
          <td>{product.name}</td>
          <td>{product.category}</td>
          <td>{product.inventory}</td>
          <td>{product.price}</td>
          <td>
            <button
              className="btn btn-outline-info btn-sm ml-1 mr-2 m-1"
              onClick={() => setModalShow(true)}
            >
              Update
            </button>
            <UpdateModal show={modalShow} onHide={() => setModalShow(false)} />
            <button
              className="btn btn-outline-danger btn-sm mr-2 m-1"
              onClick={() => handleDelete(product.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default ReadTable;
