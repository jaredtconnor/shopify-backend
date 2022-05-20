import react, { useEffect, useContext, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

import { ProductContext } from "../ProductContext";
import { UpdateProductContext } from "../ProductChangeContext";
import { WarehouseContext } from "../WarehouseContext";
import { UpdateWarehouseContext } from "../WarehouseChangeContext";

import ProductsRows from "./ProductRows"
import WarehouseRows from "./WarehouseRows";
import UpdateProduct from "./UpdateProduct";

const ProductsTable = () => {
  const [products, setProducts] = useContext(ProductContext);
  const [updateProductInfo, setUpdateProductInfo] = useContext(UpdateProductContext)
  const [warehouses, setWarehouses] = useContext(WarehouseContext);
  const [updateWarehouseInfo, setUpdateWarehouseInfo] = useContext(UpdateWarehouseContext)
  const [modalShow, setModalShow] = useState(false);

  let navigate = useNavigate();

  const handleDelete = (product_id) => {
    fetch("http://localhost:8000/product/" + product_id, {
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
          console.log(products);
          const filteredProducts = products.filter(
            (product) => product.id !== product_id
          );
          console.log(filteredProducts);
          setProducts(filteredProducts);
          alert("Product Deleted");
        } else {
          alert("Product unable to be deleted");
        }
      });
  };

  const handleUpdate = (id) => {

    const product = products.filter(product => product.id === id)[0]

    setUpdateProductInfo({

      ProductId: product.id,
      ProductName: product.name,
      ProductCategory: product.category,
      ProductInvetory: product.inventory,
      ProductPrice: product.price

    })

    navigate("/updateproduct")
  }

  const handleWarehouseDelete = (warehouse_id) => {
    fetch("http://localhost:8000/warehouse/" + warehouse_id, {
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
          console.log(filteredWarehouses);
          setProducts(filteredWarehouses);
          alert("Deleted");
        } else {
          alert("Unable to be deleted");
        }
      });
  };

  useEffect(() => {
    fetch("http://localhost:8000/product")
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        console.log(results)
        setProducts(results.data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/warehouse")
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
        <h3 className="text-center">Available Products</h3>
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
            <ProductsRows
              products={products}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              updateProductInfo={updateProductInfo}
              setUpdateProductInfo={setUpdateProductInfo}
            />
          </tbody>
        </Table>
      </div>

      <div className="p-2">
        <Button href="/addproduct" variant="secondary" className="mr-4">Add Product</Button>
      </div>

      <div className="p-2">
        <h3 className="text-center">Warehouse Locations</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col">Warehouse ID</th>
              <th scope="col">Name</th>
              <th scope="col">Location</th>
            </tr>
          </thead>
          <tbody>
            <WarehouseRows
              warehouses={warehouses}
              handleDelete={handleWarehouseDelete}
            />
          </tbody>
        </Table>
      </div>
      <div className="p-2">
        <Button href="/addwarehouse" variant="secondary" className="mr-4">Add Warehouse</Button>
      </div>
    </div>
  );
};

export default ProductsTable;
