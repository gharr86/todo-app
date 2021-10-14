import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { ToDoData } from '../../types';

const config: AxiosRequestConfig = {
  baseURL: 'http://localhost:3001',
};

const request: AxiosInstance = axios.create(config);

class ApiService {
  static getToDoList(): Promise<AxiosResponse> {
    return request.get('/todos/get');
  }

  static addToDo(toDo: ToDoData): Promise<AxiosResponse> {
    return request.post('/todos/save', toDo);
  }

  static toggleToDo(id: string): Promise<AxiosResponse> {
    return request.put(`/todos/${id}`);
  }
}

export default ApiService;
