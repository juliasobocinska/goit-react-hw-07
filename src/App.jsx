import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";  
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm"; 
import SearchBox from "./components/SearchForm";
import { addContact } from "./redux/operations"; 
import { fetchContacts } from "./redux/operations"; 
import { getIsLoading, getError } from "./redux/contactSlice"; 
import './App.css'

const App = () => {
  const dispatch = useDispatch();

  const contacts = useSelector((state) => state.contacts.items);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = (contact) => {
    dispatch(addContact(contact)); 
  };

  return (
    <div className="App">
      <h1>PHONEBOOK</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error...</p>}
      <ContactList contacts={contacts} />
      <SearchBox />
      <ContactForm onAddContact={handleAddContact} /> 
    </div>
  );
};

export default App;
