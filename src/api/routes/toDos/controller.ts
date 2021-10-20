import { Request, Response } from 'express';

import { getData, saveData, bodyShapeIsOk } from './utils';
import { ERROR_MESSAGE, BAD_REQUEST_MESSAGE, NOT_FOUND_MESSAGE } from '../../constants';

import { AppData, ToDoData } from '../../types';

export const getToDoList = (req: Request, res: Response): Response<AppData | string> => {
  const data: AppData = getData();

  if (data) return res.status(200).json(data);

  return res.status(500).send(ERROR_MESSAGE);
};

export const addToDo = (req: Request, res: Response): Response<AppData | string> => {
  const { body } = req;

  const currentData: AppData = getData();

  if (currentData?.data) {
    if (bodyShapeIsOk(body)) {
      currentData.data.push(body);
  
      saveData(currentData);
  
      return res.status(200).json(currentData);
    }

    return res.status(400).send(BAD_REQUEST_MESSAGE);
  }

  return res.status(500).send(ERROR_MESSAGE);
};

export const toggleToDo = (req: Request, res: Response): Response<AppData | string> => {
  const { params: { id } } = req;

  const currentData: AppData = getData();

  if (currentData?.data) {
    const selectedIndex: number = currentData.data.findIndex((el: ToDoData): boolean => el.id === id);

    if (selectedIndex !== -1) {
      currentData.data[selectedIndex].isDone = !currentData.data[selectedIndex].isDone;
  
      saveData(currentData);
  
      return res.status(200).json(currentData);
    }

    return res.status(404).send(NOT_FOUND_MESSAGE);
  }

  return res.status(500).send(ERROR_MESSAGE);
};
