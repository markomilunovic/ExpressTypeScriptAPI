import userModel from '../models/userModel';
import bcrypt from 'bcrypt';
import type { User } from '../common/interfaces/userInterface';



const createUser = async (body: { username: string, password: string, email: string, firstName: string, lastName: string}): Promise<boolean> => {
    try {
        const { username, password, email, firstName, lastName } = body;

        const existingUser = await userModel.findOne({ where: { email } });
        if (existingUser) {
            return false;
        }

        const hashedPassword: string = await bcrypt.hash(password, 10);

        await userModel.create({ username, password: hashedPassword, email, firstName, lastName });

        return true;
    } catch (error) {
        throw error;
    }
};

const getAllUsers = async (page: number, size: number): Promise<{ rows: User[]; count: number }> => {
    const usersData = await userModel.findAndCountAll({
        limit: size,
        offset: page * size
    });

    const users: User[] = usersData.rows.map((userData: any) => {
        return {
            id: userData.id,
            username: userData.username,
            password: userData.password,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName
        };
    });

    return {
        rows: users,
        count: usersData.count
    };
};


const getUserById = async (id: string): Promise<User | null> => {
    const user = await userModel.findByPk(id);
    if (!user) {
        return null;
    }
    const userObject: User = {
        id: user.dataValues.id,
            username: user.dataValues.username,
            password: user.dataValues.password,
            email: user.dataValues.email,
            firstName: user.dataValues.firstName,
            lastName: user.dataValues.lastName
    }
    return userObject;
};

const updateUser = async (id:string, body: { username?: string, password?: string, email?: string, firstName?: string, lastName?: string}): Promise<boolean> => {
    const { username, password, email, firstName, lastName } = body;
    const user = await userModel.findByPk(id);
    if (!user) {
        return false;
    }

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await user.update({ username, password: hashedPassword, email, firstName, lastName });
    } else {
        await user.update({ username, email, firstName, lastName });
    }

    return true;
};

const deleteUser = async (id: string): Promise<boolean> => {
    const user = await userModel.findByPk(id);
    if (!user) {
        return false;
    }

    await user.destroy();
    return true;
};

export default {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
