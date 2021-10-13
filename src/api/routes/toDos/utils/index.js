const fs = require('fs');
const path = require('path');

const getData = () => {
  const rawToDoList = fs.readFileSync(path.resolve(__dirname, '../../../data/index.json'));
  const parsedToDoList = JSON.parse(rawToDoList);

  return parsedToDoList;
};

const saveData = (newData) => {
  const stringifiedData = JSON.stringify(newData);

  fs.writeFileSync(path.resolve(__dirname, '../../../data/index.json'), stringifiedData);
};

const bodyShapeIsOk = (body) => {
  const idIsOk = body.id && typeof body.id === 'string';
  const titleIsOk = body.title && typeof body.title === 'string';
  const isDoneIsOk = body.isDone && typeof body.isDone === 'boolean';

  return idIsOk && titleIsOk && isDoneIsOk;
}; 

module.exports = {
  getData,
  saveData,
  bodyShapeIsOk,
};
