import react, { createContext, useState } from 'react';

export const UpdateProductContext = createContext();

export const UpdateProductContextProvider = (props) => {
  const [updateProductInfo, setUpdateProductInfo] = useState({
    ProductId: '',
    ProductName: '',
    ProductCategory: '',
    ProductInvetory: 0,
    ProductPrice: 0,
  });

  return (
    <UpdateProductContext.Provider
      value={[updateProductInfo, setUpdateProductInfo]}
    >
      {props.children}
    </UpdateProductContext.Provider>
  );
};
