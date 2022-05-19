import react, { useState, createContext } from "react"

export const WarehouseContext = createContext(); 

export const WarehouseProvider = (props) => { 
  const [warehouses, setWarehouses] = useState([]);
  
  return ( 
      <WarehouseContext.Provider value={[warehouses, setWarehouses]}> 
        {props.children}  
      </WarehouseContext.Provider>
  );
}
