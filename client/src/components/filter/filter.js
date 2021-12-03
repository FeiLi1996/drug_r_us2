import React from 'react'
import{useDispatch} from 'react-redux'
import { filterStoreProduct } from '../../actions';


export  const FilterProducts =()=>{
    const dispatch= useDispatch();
    
    return(
        <div className="overall_filter_wrapper">
            
            <form className="filter_option_form_wrapper">


                <div className="filter_option_container">
                    <select
                   
                    onChange={(e)=>{dispatch(filterStoreProduct(e.target.value))}}
                    className="select-element"
                    >
                        <option  value="">Filter Options</option>
                        <option  value="NO_FILTER">No Filter</option>
                        <option  value="FILTER_BY_A_TO_Z">A-Z</option>
                        <option  value="FILTER_BY_Z_TO_A">Z-A</option>
                        <option value="FILTER_BY_LOW_TO_HIGH">Low-High</option>
                        <option value="FILTER_BY_HIGH_TO_LOW">High-Low</option>
                    </select>
                </div>
        
            </form>
        </div>
    )
}