import { Request, Response } from 'express';
import todoService from '../services/todoService';
import type { TodoCreateRequestBody, TodoUpdateRequestBody } from '../common/interfaces/todoInterface';


//Creating a new todo item
const createTodo = async (req: Request<{}, {}, TodoCreateRequestBody>, res: Response): Promise<void> => {
    try {
        const TodoItem = await todoService.create(req.body);
        res.status(201).json(TodoItem);
    } catch (error) {
        res.status(500).send('Error creating todo item');
    }
};

// Retrieving all todo items
const getAllTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        let pageAsNumber: number;
        let sizeAsNumber: number;

        // Check if 'page' and 'size' query parameters exist and are strings
        if (typeof req.query.page === 'string' && typeof req.query.size === 'string') {

            pageAsNumber = Number.parseInt(req.query.page);
            sizeAsNumber = Number.parseInt(req.query.size);

            if (isNaN(pageAsNumber) || isNaN(sizeAsNumber)) {
                throw new Error('Invalid page or size');
            }
        } else {
            pageAsNumber = 0; 
            sizeAsNumber = 10; 
        }

        const todoItems = await todoService.allTodos(pageAsNumber, sizeAsNumber);
        res.status(200).json(todoItems);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error retrieving todo items');
    }
};


// Retrieving a specific todo item by its ID
const getTodoById = async (req: Request<{ id: string }, {}, {}>, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const todoItem = await todoService.todoById(id);
        if (!todoItem) {
            res.status(404).send('Todo item not found');
        } else {
            res.status(200).json(todoItem);
        }
    } catch (error) {
        res.status(500).send('Error retrieving todo item');
    }
};

// Updating a todo item
const updateTodo = async (req: Request<{ id: string }, {}, TodoUpdateRequestBody>, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const result: boolean = await todoService.update(id, req.body);
        if (!result) {
            res.status(404).send('Todo item not found');
        } else {
            res.status(200).send('Todo item updated successfully');
        }
    } catch (error) {
        res.status(500).send('Error updating todo item');
    }
};

// Deleting a todo item
const deleteTodo = async (req: Request<{ id: string }, {}, {}>, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const result: boolean = await todoService.Delete(id);
        if (!result) {
            res.status(404).send('Todo item not found');
        } else {
            res.status(200).send('Todo item deleted successfully');
        }
    } catch (error) {
        res.status(500).send('Error deleting todo item');
    }
};

export {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo
};