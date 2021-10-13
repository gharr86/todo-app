const router = require('express').Router();
const toDosRouter = require('./toDos');

router.use('/todos', toDosRouter);

module.exports = router;
