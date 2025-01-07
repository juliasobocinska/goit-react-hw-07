import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit"

// baza URL
axios.defaults.baseURL = "https://67727e6cee76b92dd49279c6.mockapi.io";

// fetch contacts
export const fetchContacts = createAsyncThunk(
    "contacts/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/contacts");
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

// add contacts
// W tej funkcji sprawdzamy, czy numer już istnieje przed dodaniem nowego kontaktu
export const addContact = createAsyncThunk(
    "contacts/addContact",
    async (contact, thunkAPI) => {
        try {
            const response = await axios.get("/contacts");
            const existingContact = response.data.find(c => c.number === contact.number);
            
            if (existingContact) {
                return thunkAPI.rejectWithValue("Kontakt z tym numerem telefonu już istnieje.");
            }

            const postResponse = await axios.post("/contacts", contact);
            return postResponse.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);


// delete contact
export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (contactId, thunkAPI) => {
        try {
            await axios.delete(`/contacts/${contactId}`);
            return contactId;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

// add default contacts
export const addDefaultContacts = createAsyncThunk(
    "contacts/addDefaultContacts",
    async (_, thunkAPI) => {
        const defaultContacts = [
            { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
            { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
            { id: "id-3", name: "Eden Clements", number: "645-17-79" },
            { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
        ];

        try {
            const response = await axios.get("/contacts");
            const existingContacts = response.data;

            for (const contact of defaultContacts) {
                // Sprawdź, czy numer telefonu nie istnieje
                const exists = existingContacts.some(
                    (existingContact) => existingContact.number === contact.number
                );

                if (!exists) {
                    await axios.post("/contacts", contact); // Dodaj kontakt tylko, jeśli nie istnieje
                }
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
