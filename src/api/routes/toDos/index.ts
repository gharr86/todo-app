import express, { Router } from 'express';
import { getToDoList, addToDo, toggleToDo } from './controller';

const router: Router = express.Router();

router.get('/get', getToDoList);
router.post('/save', addToDo);
router.put('/:id', toggleToDo);

export default router;
