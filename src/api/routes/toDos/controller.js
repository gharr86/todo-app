const { getData, saveData, bodyShapeIsOk } = require('./utils');

const ERROR_MESSAGE = 'Something went wrong :(';
const NOT_FOUND_MESSAGE = 'Not found :(';
const BAD_REQUEST_MESSAGE = 'Bad request :(';

const toDosController = {
  getToDoList: (req, res) => {
    const data = getData();

    if (data) return res.status(200).send(data);

    return res.status(500).send(ERROR_MESSAGE);
  },
  addToDo: (req, res) => {
    const { body } = req;

    const currentData = getData();

    if (currentData.data) {
      if (bodyShapeIsOk(body)) {
        currentData.data.push(body);
    
        saveData(currentData);
    
        return res.status(200).send(currentData);
      }

      return res.status(400).send(BAD_REQUEST_MESSAGE);
    }

    return res.status(500).send(ERROR_MESSAGE);
  },
  toggleToDo: (req, res)=> {
    const { params: { id } } = req;

    const currentData = getData();

    if (currentData.data) {
      const selectedIndex = currentData.data.findIndex(el => el.id === id);

      if (selectedIndex !== -1) {
        currentData.data[selectedIndex].isDone = !currentData.data[selectedIndex].isDone;
    
        saveData(currentData);
    
        return res.status(200).send(currentData);
      }

      return res.status(404).send(NOT_FOUND_MESSAGE);
    }

    return res.satatus(500).send(ERROR_MESSAGE);
  },
};

module.exports = toDosController;
