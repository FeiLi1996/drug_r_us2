import React,{useState}  from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { addToCart } from '../actions';
import { increaseQuantity,decreaseQuantity,removeFromCart,removeFromStore } from '../actions';
import axios from 'axios';

  const Products =(props)=>{
    const [totalCheckoutPrice,setTotalCheckoutPrice] =useState(0)
    const testingTotalPrice = useSelector(state => state.cartProduct.totalPrice)
    const dispatch = useDispatch()
   
  
    function testAddToCart (Product) {
        console.log(dispatch(addToCart(Product)))

        console.log(Product)
        console.log('hello')
    }
    function handleRemoveProductFromStore (id) {



        axios
        .post(
            "http://127.0.0.1:5000/delete_product",
            { withCredentials: true, 
            
            
              "id":id
            }
            
            
        )
        .then(response => {
            console.log(response,'success delete')
        })
        .catch(error => {
            console.log(error,'fail delete')
            
        })


        dispatch(removeFromStore(id))
        dispatch(removeFromCart(id))

    }

   


    // drug_name:'aspirin',
    //         price:5,
    //         quantity:5,
    //         email:'',
    //         id:1

    function dynamicButtons (product){
        if (props.productType === 'cartProduct'){
            return(
                <div>
                    <button onClick={()=>dispatch(increaseQuantity(product.id))}>+</button>
                    <button onClick={()=>dispatch(decreaseQuantity(product.id))}>-</button>
                    <button onClick={()=>dispatch(removeFromCart(product.id))}>Delete</button>
                </div>
            )
        }
        else if(props.productType === 'storeProducts'){
            return(
                <div>
                    <button onClick={()=>testAddToCart(product)}>Add To Cart</button>
                    
                </div>
            )
        }
        else if(props.productType === 'sellerProducts'){
            return(
                <div>
                    <button onClick={()=>handleRemoveProductFromStore(product.id)}>Delete</button>
                    
                </div>
            )
        }

    }
    const individualProducts = props.products.map((product,idx) =>{

     
        
        return(

            
            <div key={idx} className="product_wrapper">
                <a href ='https://placeholder.com'>
                    <img src ='https://via.placeholder.com/160x160'/> 
                </a>
               
                
                <div>Drug Name:{product.drug_name}</div>
                <div>Drug Price:${product.price}</div>
              
                <div>Quantity {props.remaining}:{product.quantity}</div>
                
                {dynamicButtons(product)}
                
           </div>
        )

    })
    
    return(
        <div className="product_overall_wrapper">
           {/* <div className="product_wrapper">
                <a href ='https://placeholder.com'>
                    <img src ='https://via.placeholder.com/80x80'/> 
                </a>
                <div>Drug Name:Aspirin</div>
                <div>Drug Price:50$</div>
                <div>Quantity Remaining:5</div>
                <button>Add To Cart</button>
           </div> */}
           {individualProducts}
           {props.productType ==='checkoutProducts'?  <div>Total Price:{testingTotalPrice}</div>:null}
        </div>
    )
}
export default Products