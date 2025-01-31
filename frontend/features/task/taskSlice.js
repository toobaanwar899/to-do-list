import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      
    },
  },
});

export const { setSearch } = taskSlice.actions;
export default taskSlice.reducer;
