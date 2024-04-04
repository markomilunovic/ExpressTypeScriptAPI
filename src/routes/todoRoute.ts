import express, { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo
} from '../controllers/todoController';


const router: Router = express.Router();

 router.use(authMiddleware);

router.route('/')
    .post(createTodo)
    .get(getAllTodos);

router.route('/:id')
    .get(getTodoById)
    .put(updateTodo)
    .delete(deleteTodo);

export default router;
