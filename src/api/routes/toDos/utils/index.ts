import fs from 'fs';
import path from 'path';

export const getData = () => {
  const rawToDoList = fs.readFileSync(path.resolve(__dirname, '../../../data/index.json'));
  const parsedToDoList = JSON.parse(rawToDoList);

  return parsedToDoList;
};

export const saveData = (newData) => {
  const stringifiedData = JSON.stringify(newData);

  fs.writeFileSync(path.resolve(__dirname, '../../../data/index.json'), stringifiedData);
};

export const bodyShapeIsOk = (body) => {
  const idIsOk = body.id && typeof body.id === 'string';
  const titleIsOk = body.title && typeof body.title === 'string';
  const isDoneIsOk = body.isDone && typeof body.isDone === 'boolean';

  return idIsOk && titleIsOk && isDoneIsOk;
};
