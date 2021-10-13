import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import ApiService from '../../../../services/apiService';

import { ToDoData } from '../../../../types';

export const getToDoList = createAsyncThunk(
  'toDoList/getToDoList',
  (): Promise<AxiosResponse<ToDoData[]>> => {
    return ApiService
      .getToDoList()
      .then(({ data }) => data)
      .catch(err => err);
  },
);
export const addToDo = createAsyncThunk(
  'toDoList/addToDo',
  (toDo: ToDoData): Promise<AxiosResponse<ToDoData[]>> => {
    return ApiService
      .addToDo(toDo)
      .then(({ data }) => data)
      .catch(err => err);
  },
);
export const toggleToDo = createAsyncThunk(
  'toDoList/toggleToDo',
  (id: string): Promise<AxiosResponse<ToDoData[]>> => {
    return ApiService
      .toggleToDo(id)
      .then(({ data }) => data)
      .catch(err => err);
  }
);
