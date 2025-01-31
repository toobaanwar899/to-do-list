import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskId: "",
};

const editSlice = createSlice({
  name: "taskEdit", 
  initialState,
  reducers: {
    setTaskId: (state, action) => {
      state.taskId = action.payload;
      console.log(state.taskId); 
    },
  },
});

export const { setTaskId } = editSlice.actions;
export default editSlice.reducer;
