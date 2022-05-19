
import react, { createContext, useState } from "react";

export const UpdateWarehouseContext = createContext();

export const UpdateWarehouseContextProvider = (props) => {
    const [updateWarehouseInfo, setUpdateWarehouseInfo] = useState({
        WarehouseName: "",
        WarehouseLocation: "",
    })

    return (
        <UpdateWarehouseContext.Provider value={[updateWarehouseInfo, setUpdateWarehouseInfo]}>
            {props.children}
        </UpdateWarehouseContext.Provider>
    )


}

