import react from "react";
import { Table, Button, Card, Form } from "react-bootstrap"; import { useEffect, useState } from "react";
import ReadProductTable from "./ReadProductTable";
import ReadWarehouseTable from "./ReadWarehouseTable";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  const [productInfo, setProductInfo] = useState({
    ProductName: "",
    ProductCategory: "",
    ProductInvetory: 0,
    ProductPrice: 0,
    ProductWarehouse: 0
  });

  const [editProductId, setEditProductId] = useState(null);

  const [modalShow, setModalShow] = useState(false);

  const [warehouseInfo, setWarehouseInfo] = useState({
    WarehouseName: "",
    WarehouseLocation: "",
  });

  const updateForm = (event) => {
    setProductInfo({ ...productInfo, [event.target.name]: event.target.value });
  };


  const handlePost = (event) => {
    event.preventDefault();

    console.log(productInfo)
    const postUrl = "http://127.0.0.1:8000/product/" + productInfo["ProductWarehouse"];

    const newProduct = JSON.stringify({
      name: productInfo["ProductName"],
      category: productInfo["ProductCategory"],
      inventory: parseInt(productInfo["ProductInvetory"]),
      price: parseInt(productInfo["ProductPrice"]),
    });

    postData(postUrl, newProduct)

  };

  const postData = async (postUrl, productToAdd) => {

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
      body: productToAdd,
    });

    response.json().then((response) => {
      if (response.status === "ok") {

        const newProductAdded = {
          id: response.data.id,
          name: response.data.name,
          category: response.data.category,
          inventory: response.data.inventory,
          price: response.data.price,
        }

        products.push(newProductAdded);
        setProducts(products);

        alert("Product added successfully");
      } else {
        alert("Failed to add product");
      }
    });

    setProductInfo({
      ProductName: "",
      ProductCategory: "",
      ProductInvetory: 0,
      ProductPrice: 0,
      ProductWarehouse: 0
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
          console.log(products)
          const filteredProducts = products.filter(
            (product) => product.id !== product_id
          );
          console.log(filteredProducts)
          setProducts(filteredProducts);
          alert("Product Deleted");
        } else {
          alert("Product unable to be deleted");
        }
      });
  };

  const handleEdit = (event, product) => {

    event.preventDefault();
    setEditProductId(product.id);

    const formValues = {
      name: product.name,
      category: product.category,
      inventory: product.inventory,
      price: product.price,
      warehouse_id: product.warehouse_id
    }

    setProductInfo(formValues);
  }

  const handleEditClick = (input) => (event) => {
    event.preventDefault();

    setProductInfo({ ...productInfo, [input]: event.target.value })
  }

  const handleFormSave = (event) => {
    event.preventDefault();

    const productData = {
      id: editProductId,
      name: productInfo.name,
      category: productInfo.category,
      inventory: productInfo.inventory,
      price: productInfo.price,
      warehouse_id: productInfo.warehouse_id
    }

    const newProducts = [...products]

    const formIndex = products.findIndex((product) => product.id === editProductId);

    newProducts[formIndex] = productData;

    setProducts(newProducts);
    setEditProductId(null);
  }

  const updateWarehouseForm = (event) => {
    setWarehouseInfo({ ...warehouseInfo, [event.target.name]: event.target.value });
  };

  const handleWarehousePost = (event) => {
    event.preventDefault();

    const postUrl = "http://127.0.0.1:8000/warehouse";

    const newWarehouse = JSON.stringify({
      name: warehouseInfo["WarehouseName"],
      location: warehouseInfo["WarehouseLocation"],
    });

    postWarehouseData(postUrl, newWarehouse)

  };

  const postWarehouseData = async (postUrl, warehouseToAdd) => {

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
      body: warehouseToAdd,
    });

    response.json().then((response) => {
      if (response.status === "ok") {

        const newWarehouseToAdd = {
          id: response.data.id,
          name: response.data.name,
          location: response.data.location,
        }

        warehouses.push(newWarehouseToAdd);
        setWarehouses(warehouses);

        alert("Added successfully");
      } else {
        alert("Failed to add product");
      }
    });

    setWarehouseInfo({
      WarehouseName: "",
      WarehouseLocation: "",
    });
  };


  const handleWarehouseDelete = (warehouse_id) => {
    fetch("http://127.0.0.1:8000/warehouse/" + warehouse_id, {
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
          const filteredWarehouses = warehouses.filter(
            (warehouse) => warehouse.id !== warehouse_id
          );
          console.log(filteredWarehouses)
          setProducts(filteredWarehouses);
          alert("Deleted");
        } else {
          alert("Unable to be deleted");
        }
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

  useEffect(() => {
    fetch("http://127.0.0.1:8000/warehouse")
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        setWarehouses(results.data);
      });
  }, []);

  return (
    <div>
      <div className="p-2">

        <Card>
          <Card.Body>
            <Form onSubmit={handlePost}>
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

              <Form.Group controlId="ProductWarehouse">
                <Form.Label>Warehouse ID</Form.Label>
                <Form.Control
                  type="number"
                  name="ProductWarehouse"
                  value={productInfo.warehouse_id}
                  onChange={updateForm}
                />
              </Form.Group>

              <Button className="m-1" variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <div className="p-2">
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
            <ReadProductTable
              products={products}
              handleDelete={handleDelete}
              modalShow={modalShow}
              setModalShow={setModalShow}
              handleFormSave={handleFormSave}
              productInfo={productInfo}
              setProductInfo={setProductInfo}
              updateForm={updateForm}
            />
          </tbody>
        </Table>
      </div>


      <div className="p-2">

        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col">Warehouse ID</th>
              <th scope="col">Name</th>
              <th scope="col">Location</th>
            </tr>
          </thead>
          <tbody>
            <ReadWarehouseTable
              warehouses={warehouses}
              handleDelete={handleWarehouseDelete}
              warehouseInfo={warehouseInfo}
              setWarehouseInfo={setWarehouseInfo}
            />
          </tbody>
        </Table>
      </div>

      <div className="p-2">

        <Card>
          <Card.Body>
            <Form onSubmit={handleWarehousePost}>
              <Form.Group controlId="WarehouseName">
                <Form.Label>Warehouse Name</Form.Label>
                <Form.Control
                  type="text"
                  name="WarehouseName"
                  value={warehouseInfo.WarehouseName}
                  onChange={updateWarehouseForm}
                />
              </Form.Group>

              <Form.Group controlId="WarehouseLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="WarehouseLocation"
                  value={warehouseInfo.WarehouseLocation}
                  onChange={updateWarehouseForm}
                />
              </Form.Group>

              <Button className="m-1" variant="primary" type="submit">
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
