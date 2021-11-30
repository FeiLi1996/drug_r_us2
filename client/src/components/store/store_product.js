import React from "react";
import Products from "../products";
 const StoreProducts =(props) => {
  return (
    <div>
        <Products products={props.products} productType={"storeProducts"} remaining="remaining"/>
    
    </div>
  );
};

export default StoreProducts