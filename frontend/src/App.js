import react from "react";
import NavBar from "./components/NavBar";

import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { ProductProvider } from "./ProductContext";
import { UpdateProductContextProvider } from "./ProductChangeContext";
import { WarehouseProvider } from "./WarehouseContext";
import { UpdateWarehouseContextProvider } from "./WarehouseChangeContext"

import ProductsTable from "./components/ProductsTable";
import AddProduct from "./components/AddProduct";
import AddWarehouse from "./components/AddWarehouse";

import UpdateProduct from "./components/UpdateProduct";

function App() {
  return (
    <div>
      <ProductProvider>
        <UpdateProductContextProvider>
          <WarehouseProvider>
            <UpdateWarehouseContextProvider>

              <NavBar />
              <div className="row justify-content-center">
                <div className="col-sm-10 col-xm-12 mr-auto ml-auto mt-4 mb-4">
                  <Router>
                    <Routes>
                      <Route exact path="/" element={<ProductsTable />} />
                      <Route exact path="/addproduct" element={<AddProduct />} />
                      <Route exact path="/addwarehouse" element={<AddWarehouse />} />
                      <Route exact path="/updateproduct" element={<UpdateProduct />} />
                    </Routes>
                  </Router>
                </div>
              </div>
            </UpdateWarehouseContextProvider>
          </WarehouseProvider>
        </UpdateProductContextProvider>
      </ProductProvider>
    </div>
  );
}

export default App;
