import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contactSlice";
import filtersReducer from "./contactFilter";

export const store = configureStore({
  reducer: {
    contacts: contactsReducer, 
    filters: filtersReducer,
  },
});
