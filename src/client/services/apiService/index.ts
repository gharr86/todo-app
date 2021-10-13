import axios, { AxiosResponse } from 'axios';

import { ToDoData } from '../../types';

const baseURL: string = 'http://localhost:3001';

class ApiService {
  static getToDoList(): Promise<AxiosResponse> {
    return axios.get(`${baseURL}/todos/get`);
  }

  static addToDo(toDo: ToDoData): Promise<AxiosResponse> {
    return axios.post(`${baseURL}/todos/save`, toDo);
  }

  static toggleToDo(id: string): Promise<AxiosResponse> {
    return axios.put(`${baseURL}/todos/${id}`);
  }
}

export default ApiService;
