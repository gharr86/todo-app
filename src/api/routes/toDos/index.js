const router = require('express').Router();
const { getToDoList, addToDo, toggleToDo } = require('./controller');

router.get('/get', getToDoList);
router.post('/save', addToDo);
router.put('/:id', toggleToDo);

module.exports = router;
