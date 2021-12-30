import React ,{useState}from 'react'
import { useHistory } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'


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
                    
                    <div ><button onClick={handleCartProductVisibility}> <FontAwesomeIcon  className='cart_icon' icon={faShoppingBasket} /> </button></div>
                    <div className={`cart_products ${cssVisibility}`}>

                      
                        <Products products={props.products} productType={'cartProduct'}/>
                        <div id="checkout_button_wrapper">
                            <button  id ="checkout_button"type="button" onClick={handleClick}>Checkout</button>
                        </div>

                    </div>
                    
                </div>
                
                )
                :
                (<MessageModal closeModal={setToggleModal} />)
            }
        </div>
    )
}
export default ShoppingCart