import react from "react";
import { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import UpdateModal from "./UpdateModal";

const ReadProductTable = ({ product, products, handleDelete, modalShow, setModalShow, handleFormSave, productInfo, setProductInfo }) => {

const handleClose = () => setModalShow(false); 
const handleShow = () => { 

  console.log("Modal is activated");
  setModalShow(true);

}

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
              onClick={handleShow}
            >
              Update
            </button>
            <button
              className="btn btn-outline-danger btn-sm mr-2 m-1"
              onClick={() => handleDelete(product.id)}
            >
              Delete
            </button> 
            <UpdateModal 
              product={product}
              modalShow={modalShow} 
              setModalShow={setModalShow}
              handleClose={handleClose}
              handleFormSave={handleFormSave}
              productInfo={productInfo}
              setProductInfo={setProductInfo}
              updateForm
            />
          </td>
        </tr>
      ))}
    </>
  );
};

export default ReadProductTable;
