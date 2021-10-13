import { createSlice } from '@reduxjs/toolkit';

import initialState from './initialState';
import { getToDoList, addToDo, toggleToDo } from './reducers';

import { ToDoListSlice } from '../../../types';

export const toDoSlice = createSlice({
  name: 'toDoList',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getToDoList.fulfilled, (state: ToDoListSlice, action) => {
        if (action.payload) state.data = action.payload.data;
      })
      .addCase(getToDoList.rejected, (state: ToDoListSlice, action) => {
        state.status = 'error';
      })
      .addCase(addToDo.pending, (state: ToDoListSlice, action) => {
        state.status = 'fetching';
      })
      .addCase(addToDo.fulfilled, (state: ToDoListSlice, action) => {
        if (action.payload) {
          state.data = action.payload.data;
          state.status = 'success';
        }
      })
      .addCase(addToDo.rejected, (state: ToDoListSlice, action) => {
        state.status = 'error';
      })
      .addCase(toggleToDo.fulfilled, (state: ToDoListSlice, action) => {
        if (action.payload) {
          state.data = action.payload.data;
          state.status = 'success';
        }
      })
      .addCase(toggleToDo.rejected, (state: ToDoListSlice, action) => {
        state.status = 'error';
      })
  },
});

export default toDoSlice.reducer;
