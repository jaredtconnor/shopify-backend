import react from "react";
import { Table, Button, Card, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import ReadTable from "./ReadTable";
import nextId from "react-id-generator";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [productInfo, setProductInfo] = useState({
    name: "",
    category: "",
    inventory: "",
    price: "",
  });

  const [modalShow, setModalShow] = useState(false);

  const updateForm = (event) => {
    setProductInfo({ ...productInfo, [event.target.name]: event.target.value });
  };

  const postData = async (event) => {
    event.preventDefault();

    const postUrl = "http://127.0.0.1:8000/product";

    const newProduct = JSON.stringify({
      id: nextId(),
      name: productInfo["ProductName"],
      category: productInfo["ProductCategory"],
      inventory: productInfo["ProductInvetory"],
      price: productInfo["ProductPrice"],
    });

    console.log(newProduct);

    const response = await fetch(postUrl, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(newProduct),
    });

    response.json().then((response) => {
      if (response.status === "ok") {
        alert("Product added successfully");
      } else {
        alert("Failed to add product");
      }
    });
    setProductInfo({
      name: "",
      category: "",
      inventory: "",
      price: "",
    });
  };

  const handleDelete = (product_id) => {
    fetch("http://127.0.0.1:8000/product/" + product_id, {
      method: "DELETE",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        if (results.status === "ok") {
          const filteredProducts = products.filter(
            (product) => product.id !== product_id
          );
          setProducts(filteredProducts);
          alert("Product Deleted");
        } else {
          alert("Product unable to be deleted");
        }
      });
  };

  const handleUpdate = (product_id) => {
    const product = products.filter((product) => product.id === product_id);

    setProductInfo({
      id: product.id,
      name: product.name,
      category: product.category,
      inventory: product.inventory,
      price: product.price,
    });
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/product")
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        setProducts(results.data);
      });
  }, []);

  return (
    <div>
      <div className="product_table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col">Product ID</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Invetory</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            <ReadTable products={products} handleDelete={handleDelete} />
          </tbody>
        </Table>

        <Card>
          <Card.Body>
            <Form onSubmit={postData}>
              <Form.Group controlId="ProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="ProductName"
                  value={productInfo.ProductName}
                  onChange={updateForm}
                />
              </Form.Group>

              <Form.Group controlId="ProductCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="ProductCategory"
                  value={productInfo.ProductCategory}
                  onChange={updateForm}
                />
              </Form.Group>

              <Form.Group controlId="ProductInvetory">
                <Form.Label>Number of Invetory</Form.Label>
                <Form.Control
                  type="number"
                  name="ProductInvetory"
                  value={productInfo.ProductInvetory}
                  onChange={updateForm}
                />
              </Form.Group>

              <Form.Group controlId="ProductPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="ProductPrice"
                  value={productInfo.ProductPrice}
                  onChange={updateForm}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ProductsTable;
