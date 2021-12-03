import React from "react";


const handleKeyPressEnter = (event) => {
    if(event.key === 'Enter'){
    
      event.preventDefault()
    }
}
const SearchBar = ({ searchQuery, setSearchQuery }) => (
   
    <form action="/" method="get" autoComplete='off'>
        <label htmlFor="header-search">
            <span className="search_label">Add drug to profile</span>
        </label>
        <input
            defaultValue={searchQuery}
            onInput={e => setSearchQuery(e.target.value)}
            type="text"
            id="drug-search"
            placeholder="Search for a drug"
            onKeyPress={(e)=>handleKeyPressEnter(e)}
            name="s"
        />
       
    </form>
    
    
);

export default SearchBar;