import react, { useContext } from "react";
import { Form, Card, Button, Modal } from "react-bootstrap";
import { UpdateProductContext } from "../ProductChangeContext";
import { useNavigate } from "react-router-dom";

const UpdateProduct = () => {

    let navigate = useNavigate(); 

    const [updateProductInfo, setUpdateProductInfo] = useContext(UpdateProductContext);

    const updateProductForm = (event) => {
        setUpdateProductInfo({ ...updateProductInfo, [event.target.name]: event.target.value });
    };

    const handlePost = async (event) => {
        event.preventDefault();

        const postUrl =
            "http://localhost:8000/product/" + updateProductInfo["ProductId"];

        const newProduct = JSON.stringify({
            name: updateProductInfo["ProductName"],
            category: updateProductInfo["ProductCategory"],
            inventory: parseInt(updateProductInfo["ProductInvetory"]),
            price: parseInt(updateProductInfo["ProductPrice"]),
        });

        postData(postUrl, newProduct);
    };

    const postData = async (postUrl, productToAdd) => {
        const response = await fetch(postUrl, {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: productToAdd,
        });

        response.json().then((response) => {
            if (response.status === "ok") {
                alert("Product edited correctly");
            } else {
                alert("Failed did not update");
            }
        });

        setUpdateProductInfo({
            ProductName: "",
            ProductCategory: "",
            ProductInvetory: 0,
            ProductPrice: 0,
            ProductWarehouse: 0,
        });

        navigate("/");

    }

  return (
      <div className="p-2">

        <Card>
          <Card.Body>
            <Form onSubmit={handlePost}>
              <Form.Group controlId="ProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="ProductName"
                  value={updateProductInfo.ProductName}
                  onChange={updateProductForm}
                />
              </Form.Group>

              <Form.Group controlId="ProductCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="ProductCategory"
                  value={updateProductInfo.ProductCategory}
                  onChange={updateProductForm}
                />
              </Form.Group>

              <Form.Group controlId="ProductInvetory">
                <Form.Label>Number of Invetory</Form.Label>
                <Form.Control
                  type="number"
                  name="ProductInvetory"
                  value={updateProductInfo.ProductInvetory}
                  onChange={updateProductForm}
                />
              </Form.Group>

              <Form.Group controlId="ProductPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="ProductPrice"
                  value={updateProductInfo.ProductPrice}
                  onChange={updateProductForm}
                />
              </Form.Group>

              <Button className="m-1" variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
  );
};

export default UpdateProduct;
