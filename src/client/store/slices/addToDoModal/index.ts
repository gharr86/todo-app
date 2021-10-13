import { createSlice } from '@reduxjs/toolkit';

import initialState from './initialState';
import reducers from './reducers';

export const toDoSlice = createSlice({
  name: 'addToDoModal',
  initialState,
  reducers,
});

export const {
  openAddToDoModal,
  closeAddToDoModal,
} = toDoSlice.actions;

export default toDoSlice.reducer;
