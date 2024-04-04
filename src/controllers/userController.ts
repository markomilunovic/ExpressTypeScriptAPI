import { Request, Response } from 'express';
import userService from '../services/userService';
import type { UserCreateRequestBody, UserUpdateRequestBody } from '../common/interfaces/userInterface';


//Creating a new user
const createUser = async (req: Request<{}, {}, UserCreateRequestBody>, res: Response): Promise<void> => {
    try {
        const result: boolean = await userService.create(req.body);
        if (result) {
            res.status(201).json({ message: 'User registered successfully' });
        } else {
            res.status(400).json({ message: 'User already exists' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Registration failed' });
    }
};


//Retrieving all users
const getAllUsers = async (req: Request, res: Response): Promise<void> => {
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

        const users = await userService.allUsers(pageAsNumber, sizeAsNumber);
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error retrieving users');
    }
};


//Retrieving a specific user by its ID
const getUserById = async (req: Request<{ id: string},{}, {}>, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const users = await userService.userById(id);
        if (!users) {
            res.status(404).send('User not found');
        } else {
            res.status(200).json(users);
        }
    } catch (error) {
        res.status(500).send('Error retrieving users');
    }
};

//Updating a user 
const updateUser = async (req: Request<{ id: string}, {}, UserUpdateRequestBody>, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const result: boolean = await userService.update(id, req.body);
        if (!result) {
            res.status(404).send('User not found');
        } else {
            res.status(200).send('User updated successfully');
        }
    } catch (error) {
        res.status(500).send('Error updating user');
    }
};

//Deleting a user
const deleteUser = async (req: Request<{id: string}, {}, {}>, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const result: boolean = await userService.Delete(id);
        if (!result) {
            res.status(404).send('User not found');
        } else {
            res.status(200).send('User deleted successfully');
        }
    } catch (error) {
        res.status(500).send('Error deleting user');
    }
};

export {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
