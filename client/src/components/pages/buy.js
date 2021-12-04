import React from "react";
import { useSelector } from 'react-redux';







import {FilterProducts} from '../filter/filter'
import ShoppingCart from "../cart/shopping_cart";
import StoreProducts from "../store/store_product";








export const Buy =() => {
  const storeProducts =  useSelector(state => state.storeProduct.product)
  const cartProducts =  useSelector(state => state.cartProduct.product)
  


  return (
    <div className="buy_page_overall_wrapper">
 
      <div className="filter_cart_wrapper">
        <ShoppingCart products={cartProducts} />
        <FilterProducts />
        
        
      </div>
      <StoreProducts products={storeProducts} />
    </div>
  );
};
