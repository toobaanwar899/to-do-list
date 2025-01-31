import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "@/features/task/taskSlice";
import editSlice from "@/features/editIdgetter/editslice";

export const store = configureStore({
  reducer: {
    task: taskSlice,
    taskEdit: editSlice,
  },
});
