import React,{useState} from "react";
import { useSelector } from 'react-redux';
import { join } from 'lodash';
import axios from 'axios'



export const CheckInteractions =() => {
 
  const [interactionDescriptions,setinteractionDescriptions] =useState([])
  const [errorMessage,setErrorMessage] = useState('')
  let drug_list=useSelector(state=>state.userProfile.originalProfile.drug_profile)
  let RXCUI_list_promises; 
  let RXCUI_list;
  let RXCUI;
  let listOfDrugInteractions
  

  



 
 
  function showInteractions(){
    
    RXCUI_list_promises = drug_list.map( drug =>
   
         axios
        .get(
            `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${drug}`
            
            
        )
        .then(response => {

            RXCUI = response.data.drugGroup.conceptGroup[response.data.drugGroup.conceptGroup.length-1].conceptProperties[0].rxcui
            //console.log(response.data.drugGroup.conceptGroup[response.data.drugGroup.conceptGroup.length-1].conceptProperties[0].rxcui)
            // RXCUI_list_promises.push(RXCUI)
            console.log(RXCUI)
            
            return  RXCUI
            
        })
        .catch(error => {
            console.log(error)
            
        }))
   
      

      RXCUI_list= Promise.all(RXCUI_list_promises).then (responses =>(
        
     
      //https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=207106+152923+656659
       
      axios
        .get(
            `https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${responses.join('+')}`
            
            
        )
        .then(response => {

            
            //console.log(response.data.drugGroup.conceptGroup[response.data.drugGroup.conceptGroup.length-1].conceptProperties[0].rxcui)
            // RXCUI_list.push(RXCUI)
            //console.log(response.data.fullInteractionTypeGroup)
            listOfDrugInteractions =response.data.fullInteractionTypeGroup[0].fullInteractionType
            listOfDrugInteractions.map(interaction=>{  
               //console.log(interaction.interactionPair[0].description)
            setinteractionDescriptions(interactionDescriptions=>[...interactionDescriptions,interaction.interactionPair[0].description])
               
            
            })
            return "Success"
            
          })
        .catch(error => {
            console.log(error)
            setErrorMessage('No interactions were found at this time')
            
        })
        
      )
      
    )
    console.log(RXCUI_list,'hello')
    
  
  }
  

  
  return (
    <div className="interaction_wrapper">


      <div className="med_header"> Medication List:
              {(drug_list.length != 0)?
                (<ul className="medication_list">
                  {drug_list.map((drug,idx)=>
                    <li className="medication" key={idx}> {drug}</li>

                  )}
                    
                </ul>)
                :
                <div className="error_message">No medication(s) in profile</div>
              } 
            </div> 

      <button className= "interacton_button"onClick={()=>{showInteractions()}}>Check Interaction</button>
      {interactionDescriptions.map((description,idx) =>
        <div className=" interaction_description"key={idx}>{description} </div>
        )}
      <div className="error_message">{errorMessage}</div>
    </div>
  );
};