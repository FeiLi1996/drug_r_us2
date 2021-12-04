import React ,{useState}from 'react'
import { useHistory } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import MessageModal from '../modals/message_modal';
import { setTotalPrice } from '../../actions';


import Products from '../products'



  const ShoppingCart =(props)=>{
    const [openModal,setToggleModal] = useState(false)
    const [cssVisibility,setCssVisibility] = useState('cartProductInvisible')
    const [toggleVisibility,setToggleVisibility] = useState(false)
    const isLogged = useSelector(state=>state.profileStatusReducer.isLogged)
    const profileFilled = useSelector(state=>state.profileStatusReducer.profileFilled)
    const dispatch = useDispatch()
    let history = useHistory();

    function handleClick() {
        if(!isLogged || !profileFilled){
            setToggleModal(true) 
            
        }
        else{

            console.log(isLogged,profileFilled)
            dispatch(setTotalPrice())
            history.push("/Checkout");
        }
    }
    function handleCartProductVisibility(){
        setToggleVisibility(toggleVisibility => !toggleVisibility)

        if(toggleVisibility){
            setCssVisibility('cartProductInvisible') 
    
        }
        else{
            setCssVisibility('cartProducVisible')  
        }
    }

    return(
        <div className="cart_components_wrapper_overall">
            {!openModal?(
                <div className='cart_components_wrapper' >
                    
                    <div className='cart_icon'><button onClick={handleCartProductVisibility}>Your Cart </button></div>
                    <div className={`cart_products ${cssVisibility}`}>

                      
                        <Products products={props.products} productType={'cartProduct'}/>
                        <button type="button" onClick={handleClick}>Checkout</button>

                    </div>
                    
                </div>
                
                )
                :
                (<MessageModal closeModal={setToggleModal} isLogged={isLogged} profileFilled={profileFilled} />)
            }
        </div>
    )
}
export default ShoppingCart