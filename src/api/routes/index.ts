import express, { Router } from 'express';
import toDosRouter from './toDos';

const router: Router = express.Router();

router.use('/todos', toDosRouter);

export default router;
