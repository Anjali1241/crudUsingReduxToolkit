// features/task/tasksSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  task: [],
};

const taskSlice = createSlice({
  name: 'taskSlice',
  initialState,
  reducers: {
    addtask: (state, action) => {
      state.task.push(action.payload);
    },
    edittask: (state, action) => {
      const { id, firstName, lastName } = action.payload;
   
      state.task = state.task.map((ele) =>
        ele.id === id ? { ...ele, firstName, lastName } : ele
      );

    },
    deletetask: (state, action) => {
      const { id } = action.payload;
      state.task = state.task.filter((ele) => ele.id !== id);
    },
  },
});

// Ensure the actions are exported correctly
export const { addtask, edittask, deletetask } = taskSlice.actions;

export default taskSlice.reducer;
