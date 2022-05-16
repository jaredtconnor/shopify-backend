import react from "react";
import { Modal, Button, Form, Card } from "react-bootstrap";

const UpdateModal = ({ product, modalShow, setModalShow, handleClose, handleFormSave, productInfo, setProductInfo, updateForm }) => {
  return (
    <Modal show={modalShow} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit Product: {product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body>
            <Form onSubmit={handleFormSave}>
              <Form.Group controlId="ProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="ProductName"
                  value={productInfo.ProductName}
                  onChange={updateForm}
                  placeholder={product.name}
                />
              </Form.Group>

              <Form.Group controlId="ProductCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="ProductCategory"
                  value={productInfo.ProductCategory}
                  onChange={updateForm}
                  placeholder={product.category}
                />
              </Form.Group>

              <Form.Group controlId="ProductInvetory">
                <Form.Label>Number of Invetory</Form.Label>
                <Form.Control
                  type="number"
                  name="ProductInvetory"
                  value={productInfo.ProductInvetory}
                  onChange={updateForm}
                  placeholder={product.invetory}
                />
              </Form.Group>

              <Form.Group controlId="ProductPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="ProductPrice"
                  value={productInfo.ProductPrice}
                  onChange={updateForm}
                  placeholder={product.price}
                />
              </Form.Group>

              <Form.Group controlId="ProductWarehouse">
                <Form.Label>Warehouse ID</Form.Label>
                <Form.Control
                  type="number"
                  name="Warehouse_ID"
                  value={productInfo.warehouse_id}
                  onChange={updateForm}
                  placeholder={product.warehouse_id}
                />
              </Form.Group>

              <Button className="m-1" variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card> 
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateModal;
