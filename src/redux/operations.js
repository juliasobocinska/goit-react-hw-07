import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit"

//baza URL
axios.defaults.baseURL = "https://67727e6cee76b92dd49279c6.mockapi.io";

//fetch contacts
export const fetchContacts = createAsyncThunk(
    "contacts/fetchAll",
    async(_, thunkAPI) => {
        try {
            const response = await axios.get("/contacts");
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

//add contacts
export const addContact = createAsyncThunk(
    "contacts/addContact",
    async(contact, thunkAPI) => {
        try {
            const response = await axios.post("/contacts", contact);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

//delete contacts
export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async(contactId, thunkAPI) => {
        try {
            await axios.delete(`/contacts/${contactId}`);
            return contactId;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);