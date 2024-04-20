import express, { Router } from 'express';
//import authMiddleware from '../middleware/authMiddleware';
import upload from '../middleware/multerMiddleware';

import {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo
} from '../controllers/todoController';


const router: Router = express.Router();

//router.use(authMiddleware);
router.use(upload.single('file'));

router.route('/')
    .post(createTodo)
    .get(getAllTodos);

router.route('/:id')
    .get(getTodoById)
    .put(updateTodo)
    .delete(deleteTodo);

export default router;
