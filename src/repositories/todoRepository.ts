import todoModel from '../models/todoModel';
import { TodoItem } from '../common/interfaces/todoInterface';


const createTodo = async (body: { title: string; description: string }): Promise<TodoItem> => {
    const { title, description } = body;

    const todo = await todoModel.create({ title, description });
    
    const todoObject: TodoItem = {
        id: todo.dataValues.id,
        title: todo.dataValues.title,
        description: todo.dataValues.description,
        status: todo.dataValues.status
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


const updateTodo = async (id: string, body: { title?: string; description?: string; status?: string }): Promise<boolean> => {
    const { title, description, status } = body;
    const todoItem = await todoModel.findByPk(id);
    if (!todoItem) {
        return false;
    };
    await todoItem.update({ title, description, status });
    return true;
};

const deleteTodo = async (id: string): Promise<boolean> => {
    const todoItem = await todoModel.findByPk(id);
    if (!todoItem) {
        return false;
    };
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
