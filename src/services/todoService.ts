import todoRepository from '../repositories/todoRepository';
import type { TodoCreateRequestBody, TodoUpdateRequestBody, TodoItem } from '../common/interfaces/todoInterface';


    const create = async (body: TodoCreateRequestBody, imagePath: string): Promise<TodoItem> => {
        return await todoRepository.createTodo(body, imagePath);
    };


    const allTodos = async (pageAsNumber: number, sizeAsNumber: number): Promise<{ content: TodoItem[], totalPages: number }> => {
        let page: number = 0;
        if (!isNaN(pageAsNumber) && pageAsNumber > 0) {
            page = pageAsNumber;
        }
    
        let size: number = 10;
        if (!isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
            size = sizeAsNumber;
        }
    
        const { rows, count } = await todoRepository.getAllTodos(page, size);
        const totalPages = Math.ceil(count / size);
    
        return {
            content: rows,
            totalPages: totalPages
        };
    };


    const todoById = async (id: string): Promise<TodoItem | null> => {
        return await todoRepository.getTodoById(id);
    };

    const update = async (id: string, body: TodoUpdateRequestBody, imagePath: string): Promise<boolean> => {
        return await todoRepository.updateTodo(id, body, imagePath);
    };
    

    const Delete = async (id: string): Promise<boolean> => {
        return await todoRepository.deleteTodo(id);
    };

    
    export default{
        create,
        allTodos,
        todoById,
        update,
        Delete
    };
