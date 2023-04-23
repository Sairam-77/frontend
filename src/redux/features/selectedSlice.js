import { createSlice } from "@reduxjs/toolkit";

const initialState = {value:{}};

export const selectedSlices = createSlice({
  name: "selected",
  initialState: initialState,
  reducers: {
    addMovie: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addMovie } = selectedSlices.actions;
export default selectedSlices.reducer;