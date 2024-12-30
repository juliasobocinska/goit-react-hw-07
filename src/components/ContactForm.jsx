import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../redux/operations";
import styles from "../styles/ContactForm.module.css"; 

const ContactForm = () => {
  const [name, setName] = useState(""); 
  const [number, setNumber] = useState(""); 
  const dispatch = useDispatch(); 

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (name && number) {
      dispatch(addContact({ name, number })); 
      setName(""); 
      setNumber(""); 
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Imię"
        className={styles.inputField}
      />
      <input
        type="tel"
        value={number}
        onChange={handleNumberChange}
        placeholder="Numer telefonu"
        className={styles.inputField}
      />
      <button type="submit" className={styles.submitButton}>Add</button> 
    </form>
  );
};

export default ContactForm;