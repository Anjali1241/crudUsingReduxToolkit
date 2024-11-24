import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './feature/task/tasksSlice'

const store=configureStore({
    reducer:{
        taskData:taskReducer
    }
})
export default store;