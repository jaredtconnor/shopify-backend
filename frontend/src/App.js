import react from "react";
import NavBar from "./components/NavBar";

import ProductsTable from "./components/ProductsTable";

function App() {
  return (
    <div>
      <NavBar />
       <div className="row justify-content-center">
        <div className="col-sm-10 col-xm-12 mr-auto ml-auto mt-4 mb-4">
          <ProductsTable />
        </div>
      </div>
    </div>
  );
}

export default App;
