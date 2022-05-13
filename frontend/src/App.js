import react from "react"
import { Link, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";

import { ProductContext } from "./ProductContext";
import ProductsTable from "./components/ProductsTable"

function App() {
  return (

    <div>
      <NavBar />
      <ProductContext.Provider>
        <ProductsTable />
      </ProductContext.Provider>
    </div>

  );
}

export default App;
