import fs from 'fs';
import path from 'path';

import { AppData, ToDoData } from '../../../types';

export const getData = (): AppData => {
  const rawToDoList: string = fs.readFileSync(path.resolve(__dirname, '../../../data/index.json'), 'utf8');
  const parsedToDoList: AppData = JSON.parse(rawToDoList);

  return parsedToDoList;
};

export const saveData = (newData: AppData): void => {
  const stringifiedData = JSON.stringify(newData);

  fs.writeFileSync(path.resolve(__dirname, '../../../data/index.json'), stringifiedData);
};

export const bodyShapeIsOk = (body: ToDoData): boolean => {
  const idIsOk: boolean = Boolean(body.id) && typeof body.id === 'string';
  const titleIsOk: boolean = Boolean(body.title) && typeof body.title === 'string';
  const isDoneIsOk: boolean = body.isDone && typeof body.isDone === 'boolean';

  return idIsOk && titleIsOk && isDoneIsOk;
};
