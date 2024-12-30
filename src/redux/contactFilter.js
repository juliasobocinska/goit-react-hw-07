import { createSlice } from "@reduxjs/toolkit";

  const initialState = {
    name: "",
  };
  
  const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
      setStatusFilter(state, action) {
        state.name = action.payload;
      },
    },
  });

  export const { setStatusFilter } = filtersSlice.actions;
  export default filtersSlice.reducer;