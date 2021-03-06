import React,{useState} from "react";
import { useSelector } from 'react-redux';
import { join } from 'lodash';
import axios from 'axios'



export const CheckInteractions =() => {
  const [interactionDescriptions,setinteractionDescriptions] =useState([])
  const [errorMessage,setErrorMessage] = useState('')
  let drug_list=useSelector(state=>state.userProfile.originalProfile.drug_profile)
  let RXCUI_list_promises
  let RXCUI_list
  let RXCUI
  let listOfDrugInteractions
  let drugNameIndex = 0
  let tempRXCUIList
  let interactionDrugOne
  let interactionDrugTwo

  function showInteractions(){
    setinteractionDescriptions([])
    RXCUI_list_promises = drug_list.map( drug =>
   
      axios.get(
            `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${drug}`
            
            
        )
        .then(response => {
            tempRXCUIList = response.data.drugGroup.conceptGroup[response.data.drugGroup.conceptGroup.length-1].conceptProperties
            
            while( (tempRXCUIList[drugNameIndex].name).includes('/') ){

              drugNameIndex++

            }
            RXCUI = tempRXCUIList[drugNameIndex].rxcui
            drugNameIndex = 0
            
            return  RXCUI
            
        })
        .catch(error => {
            console.log(error)
            
        }))
   
      

      RXCUI_list= Promise.all(RXCUI_list_promises).then (responses =>(

      axios.get(
            `https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${responses.join('+')}`
            
            
        )
        .then(response => {

            listOfDrugInteractions =response.data.fullInteractionTypeGroup[0].fullInteractionType
            listOfDrugInteractions.map(overallInteractionPair=>{  

               interactionDrugOne = overallInteractionPair.comment.split('= ')[2].split(' ')[0]
               interactionDrugTwo =overallInteractionPair.comment.split('= ')[5].split(' ')[0]

              overallInteractionPair.interactionPair.map(eachInteractionPair =>{
                setinteractionDescriptions(interactionDescriptions => [
                    ...interactionDescriptions,
                    {
                      'drugNameOne':interactionDrugOne,
                      'drugNameTwo':interactionDrugTwo,
                      'interactionDescription':eachInteractionPair.description
                    }
                  
                  ])

              })
            
            
            })

            setinteractionDescriptions(interactionDescriptions => _.uniqBy(interactionDescriptions,'interactionDescription'))
      
            return "Success"
            
          })
        .catch(error => {
            console.log(error)
            setErrorMessage('No interactions were found at this time')
            
        })
        
      )
      
    )
  }
  

  
  return (
    <div className="interaction_component_wrapper">

      
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

      <button className= "interacton_button"onClick={()=>{showInteractions()}}>Check Interactions</button>
        {interactionDescriptions.map((description,idx) =>
          <ul key ={idx} className='interaction_description_wrapper'>
              <div className="interaction_description_header" >
                  
                  <span className='interaction_drugNameOne'>{description.drugNameOne} </span><span className='preposition'>with </span><span className='interaction_drugNameTwo'>{description.drugNameTwo}</span>
              </div>
              <li className={`interaction_description`}>{description.interactionDescription}</li>
          </ul>
        )}
      <div className="error_message">{errorMessage}</div>
    </div>
  );
};