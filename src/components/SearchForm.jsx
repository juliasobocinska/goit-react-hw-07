import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setStatusFilter } from "../redux/contactFilter"; 
import styles from "../styles/SearchForm.module.css"; 

const SearchBox = () => {
  const filter = useSelector((state) => state.filters.name || "");  
  const dispatch = useDispatch();  

  const handleChange = (evt) => {
    dispatch(setStatusFilter(evt.target.value)); 
  };

  return (
    <div className={styles.searchContainer}> 
      <p className={styles.searchLabel}>Find contacts by name</p>
      <input
        type="text"
        value={filter}  
        onChange={handleChange}  
        placeholder="search contacts..."  
        className={styles.searchInput} 
      />
    </div>
  );
};

export default SearchBox;