import React from "react";


const handleKeyPressEnter = (event) => {
    if(event.key === 'Enter'){
    
      event.preventDefault()
    }
}
const SearchBar = ({ searchQuery, setSearchQuery }) => (
   
    <form action="/" method="get" autoComplete='off'>
        <label htmlFor="header-search">
            <span className="visually-hidden">Add drug to profile</span>
        </label>
        <input
            defaultValue={searchQuery}
            onInput={e => setSearchQuery(e.target.value)}
            type="text"
            id="header-search"
            placeholder="Search for a drug"
            onKeyPress={(e)=>handleKeyPressEnter(e)}
            name="s"
        />
       
    </form>
    
    
);

export default SearchBar;