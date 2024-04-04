import userRepository from '../repositories/userRepository';
import type { UserCreateRequestBody, UserUpdateRequestBody, User } from '../common/interfaces/userInterface';


const create = async (body: UserCreateRequestBody): Promise<boolean> => {
    return await userRepository.createUser(body);
};

const allUsers = async (pageAsNumber: number, sizeAsNumber: number): Promise<{ content: User[], totalPages: number }> => {
    let page: number = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        page = pageAsNumber;
    }

    let size: number = 10;
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
        size = sizeAsNumber;
    }

    const { rows, count } = await userRepository.getAllUsers(page, size);
    const totalPages = Math.ceil(count / size);

    return {
        content: rows,
        totalPages: totalPages
    };
};


const userById = async (id: string): Promise<User | null> => {
    return await userRepository.getUserById(id);
};

const update = async (id: string, body: UserUpdateRequestBody): Promise<boolean> => {
    return await userRepository.updateUser(id, body);
};


const Delete = async (id: string): Promise<boolean> => {
    return await userRepository.deleteUser(id);
};

    export default {
        create,
        allUsers,
        userById,
        update,
        Delete
    };
