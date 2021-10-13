import { configureStore } from "@reduxjs/toolkit";

import toDoListReducer from './slices/toDoList';
import addToDoModalReducer from './slices/addToDoModal';

const store = configureStore({
  reducer: {
    toDoList: toDoListReducer,
    addToDoModal: addToDoModalReducer,
  },
});

export default store;
