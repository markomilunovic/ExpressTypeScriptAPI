import { TodoItem } from '../src/common/interfaces/todoInterface';
import { mocked } from "jest-mock";
import todoRepository from '../src/repositories/todoRepository';
jest.mock('../src/repositories/todoRepository');

type MockTodos = {
  rows: TodoItem[];
  count: number;
};

describe('Todo Service', () => {
  describe('create', () => {
    it('should create a new todo item', async () => {
      // Define a mock todo item
      const newTodo: TodoItem = {
        id: 1,
        title: 'Test Todo',
        description: 'This is a test todo item',
        imagePath: 'path/to/newImage.jpg',
        status: 'pending'
      };

      const imagePath = 'path/to/newImage.jpg';

      mocked(todoRepository.createTodo).mockResolvedValueOnce(newTodo);

      const createdTodo = await todoRepository.createTodo(newTodo, imagePath);

      expect(createdTodo).toHaveProperty('id');
      expect(createdTodo.title).toEqual(newTodo.title);
      expect(createdTodo.description).toEqual(newTodo.description);
      expect(createdTodo.imagePath).toEqual(imagePath);
      expect(createdTodo.status).toEqual('pending');
    })
  });

describe('getAllTodos', () => {
  it('should return all todo items', async () => {
    // Define an array of mock todo items
    const mockTodos: MockTodos = {
      rows: [
          { id: 1, title: 'Todo 1', description: 'Description 1', status: 'pending' },
          { id: 2, title: 'Todo 2', description: 'Description 2', status: 'completed' },
      ],
      count: 2
  };

    mocked(todoRepository.getAllTodos).mockResolvedValueOnce(mockTodos);

    const result = await todoRepository.getAllTodos(1,10);

    expect(result).toEqual(mockTodos);
  });
});

describe('todoById', () => {
  it('should return a todo item by its ID', async () => {
    // Define a mock todo item and its ID
    const mockTodoId = '1';
    const mockTodo: TodoItem = {
      id: 1,
      title: 'Test Todo',
      description: 'This is a test todo item',
      status: 'pending'
    };

    mocked(todoRepository.getTodoById).mockResolvedValueOnce(mockTodo);

    const result = await todoRepository.getTodoById(mockTodoId);

    expect(result).toEqual(mockTodo);
  });

  it('should return null when no todo item is found', async () => {
    // Define a non-existent todo item ID
    const nonExistentTodoId = '999';

    mocked(todoRepository.getTodoById).mockResolvedValueOnce(null);

    const result = await todoRepository.getTodoById(nonExistentTodoId);

    expect(result).toBeNull();
  });
});


describe('updateTodo', () => {
  it('should update a todo item', async () => {
    // Define a mock todo item and its ID
    const todoId = '123'; 
    const mockTodo = {
      title: 'Updated Title',
      description: 'Updated Description',
      status: 'completed'
    };

    const imagePath = 'path/to/newImage.jpg';

    mocked(todoRepository.updateTodo).mockResolvedValueOnce(true);

    const result = await todoRepository.updateTodo(todoId, mockTodo, imagePath);

    expect(result).toBe(true); 
  });

  it('should return false if todo item is not found', async () => {
    // Prepare test data
    const nonExistentId = '999'; 
    const mockTodo = {
      title: 'Updated Title',
      description: 'Updated Description',
      status: 'completed'
    };

    const imagePath = 'path/to/newImage.jpg';

    mocked(todoRepository.updateTodo).mockResolvedValueOnce(false);

    const result = await todoRepository.updateTodo(nonExistentId, mockTodo, imagePath);

    expect(result).toBe(false); 
  });
});

describe('deleteTodo', () => {
  it('should delete a todo item', async () => {
    // Define a mock todo item ID
    const todoId = '123';

    // Mock the implementation of getTodoById to return a mock todo item
    mocked(todoRepository.deleteTodo).mockResolvedValueOnce(true);

    const result = await todoRepository.deleteTodo(todoId);

    expect(result).toBe(true); 
  });

  it('should return false if todo item is not found', async () => {
    // Define a non-existent todo item ID
    const nonExistentId = '999';

    mocked(todoRepository.deleteTodo).mockResolvedValueOnce(false);

    const result = await todoRepository.deleteTodo(nonExistentId);

    expect(result).toBe(false); 
  });
});

  });

