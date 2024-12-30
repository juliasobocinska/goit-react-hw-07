import React from "react";
import { useDispatch } from "react-redux";
import { deleteContact } from "../redux/operations";
import styles from "../styles/Contact.module.css"; 

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <li className={styles.contactItem}>
      <span className={styles.contactInfo}>
        {name} {number}
      </span>
      <button onClick={handleDelete} className={styles.deleteButton}>
        Delete
      </button>
    </li>
  );
};

export default Contact;