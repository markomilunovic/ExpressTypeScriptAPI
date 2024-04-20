import todoModel from '../models/todoModel';
import { unlink } from 'fs/promises';
import { TodoItem } from '../common/interfaces/todoInterface';


const createTodo = async (body: { title: string; description: string }, imagePath: string): Promise<TodoItem> => {
    const { title, description } = body;

    const todo = await todoModel.create({ title, description, imagePath });
    
    const todoObject: TodoItem = {
        id: todo.dataValues.id,
        title: todo.dataValues.title,
        description: todo.dataValues.description,
        status: todo.dataValues.status,
        imagePath: todo.dataValues.imagePath
    };
    
    return todoObject;
};


const getAllTodos = async (page: number, size: number): Promise<{ rows: TodoItem[]; count: number }> => {
    const todo = await todoModel.findAndCountAll({
        limit: size,
        offset: page * size
    });

    const todoItem: TodoItem[] = todo.rows.map((todoData: any) => {
        return {
            id: todoData.id,
            title: todoData.title,
            description: todoData.description,
            status: todoData.status
        }
    });

    return {
        rows: todoItem,
        count: todo.count
    };
};

const getTodoById = async (id: string): Promise<TodoItem | null> => {
    const todoItem = await todoModel.findByPk(id);

    if (!todoItem) {
        return null;
    };

    const todoItemObject: TodoItem = {
        id: todoItem.dataValues.id,
        title: todoItem.dataValues.title,
        description: todoItem.dataValues.description,
        status: todoItem.dataValues.status
    };
    return todoItemObject;
};


const updateTodo = async (id: string, body: { title?: string; description?: string; status?: string }, imagePath: string): Promise<boolean> => {
    const { title, description, status } = body;
    const todoItem = await todoModel.findByPk(id);
    if (!todoItem) {
        return false;
    };
    await todoItem.update({ title, description, status, imagePath });
    return true;
};

const deleteTodo = async (id: string): Promise<boolean> => {
    const todoItem = await todoModel.findByPk(id);
    if (!todoItem) {
        return false;
    };

    const imagePath = todoItem.dataValues.imagePath;

    if (imagePath) {
        try {
            await unlink(imagePath);  // Attempt to delete the file
        } catch (error) {
            console.error('Failed to delete the associated image file:', error);
        }
    }


    await todoItem.destroy();
    return true;
};


export default{
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo
};
