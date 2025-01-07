import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../redux/operations";
import styles from "../styles/ContactForm.module.css";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState(""); 
  const dispatch = useDispatch();

  //pobieranie istniejace kontakty z redux store
  const contacts = useSelector((state) => state.contacts.items);

  // Funkcja formatująca numer telefonu
  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, ""); 
    const formatted = digits
      .slice(0, 9) 
      .replace(/(\d{3})(\d{3})(\d{0,3})/, (_, g1, g2, g3) =>
        [g1, g2, g3].filter(Boolean).join("-")
      );
    return formatted;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (/\d/.test(name)) {
      setError("Name cannot include numbers.");
      return;
    }

    
    if (!number || number.length !== 11) { 
      setError("Phone Number must have format 123-456-789.");
      return;
    }

     // Sprawdzanie, czy numer już istnieje
     const duplicateNumber = contacts.some(
      (contact) => contact.number === number 
    );

    if (duplicateNumber) {
      setError("This phone number already exists.");
      return;
    }

    //sprawdzenie, czy kontakt juz jest
    const duplicate = contacts.some(
      (contact) => contact.name === name && contact.number === number
    );

    if (duplicate) {
      setError("This contact exist already.");
      return;
    }


    dispatch(addContact({ name, number }));
    setName("");
    setNumber("");
    setError(""); 
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setError("");
  };

  const handleNumberChange = (e) => {
    const value = e.target.value;
    const formattedNumber = formatPhoneNumber(value); 
    setNumber(formattedNumber);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Name"
        className={styles.inputField}
      />
      <input
        type="tel" 
        value={number}
        onChange={handleNumberChange}
        placeholder="Phone Number (123-456-789)"
        className={styles.inputField}
      />
        
      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" className={styles.submitButton}>Add</button>
    </form>
  );
};

export default ContactForm;
