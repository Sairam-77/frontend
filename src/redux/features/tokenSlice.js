import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: null };

export const tokenSlice = createSlice({
  name: "Token",
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      state.value = action.payload;
    },
    deleteToken: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setToken, deleteToken } = tokenSlice.actions;
export default tokenSlice.reducer;