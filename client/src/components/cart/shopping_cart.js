import React ,{useState}from 'react'
import { useHistory } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import MessageModal from '../modals/message_modal';
import { setTotalPrice } from '../../actions';


import Products from '../products'



  const ShoppingCart =(props)=>{
    const [openModal,setToggleModal] = useState(false)
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

    return(
        <div className="cart_components_wrapper_overall">
            {!openModal?(
                <div className='cart_components_wrapper' >
                    
                    <div className='cart_icon'><button>Cart Icon</button></div>
                    <div className='cart_products'>

                      
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