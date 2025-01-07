import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteContact } from "../redux/operations"; 
import Contact from "./Contact"; 
import styles from "../styles/ContactList.module.css"; 

const ContactList = () => {
  const contacts = useSelector((state) => state.contacts.items); 
  const filter = useSelector((state) => state.filters.name); 
  const dispatch = useDispatch(); 

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = (id) => {
    dispatch(deleteContact(id)); 
  };

  return (
    <ul className={styles.contactList}>
      {filteredContacts.map((contact) => (
        <Contact
        
  key={`${contact.id}-${contact.number}-${contact.createdAt}`} 
  id={contact.id}      
  name={contact.name}  
  number={contact.number}
  onDelete={handleDelete} 
  className={styles.contactItem} 
/>

        
      ))}
    </ul>
  );
};

export default ContactList;
