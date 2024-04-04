import userModel from '../models/userModel';
import accessTokenModel from '../models/accessTokenModel';
import refreshTokenModel from '../models/refreshTokenModel';
import resetTokenModel from '../models/resetTokenModel';
import { User, Token, RefreshToken} from '../common/interfaces/authInterface';
import bcrypt from'bcrypt';

const createUser = async (body: { username: string, password: string, email: string, firstName: string, lastName: string}): Promise<User> => {
    try {
        const { username, password, email, firstName, lastName } = body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({ username, password: hashedPassword, email, firstName, lastName });

        // Extract the properties from the created user object
        const userObject: User = {
            id: user.dataValues.id,
            username: user.dataValues.username,
            password: user.dataValues.password,
            email: user.dataValues.email,
            firstName: user.dataValues.firstName,
            lastName: user.dataValues.lastName
        };

        return userObject;
    } catch (error) {
        throw error;
    }
};
  

const findUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const user = await userModel.findOne({ where: { email } });

        if (user === null) {
            return null;
        }
        const userObject: User = {
            id: user.dataValues.id,
            username: user.dataValues.username,
            password: user.dataValues.password,
            email: user.dataValues.email,
            firstName: user.dataValues.firstName,
            lastName: user.dataValues.lastName
        };

        return userObject;
    } catch (error) {
        throw error;
    }
};

const createAccessToken = async (userId: number, accessTokenExpiresAt: Date): Promise<Token> =>{
   try {
    const token = await accessTokenModel.create({ userId: userId, expiresAt: accessTokenExpiresAt });

    const tokenObject: Token = {
        id: token.dataValues.id,
        userId: token.dataValues.userId,
        expiresAt: token.dataValues.expiresAt,
    };

    return tokenObject;
} catch (error) {
    throw error;
}
};


const createRefreshToken = async (accessTokenId: number, refreshTokenExpiresAt: Date): Promise<RefreshToken> =>{
    try {
     const token = await refreshTokenModel.create({ accessTokenId: accessTokenId, expiresAt: refreshTokenExpiresAt });

     const tokenObject: RefreshToken = {
        id: token.dataValues.id,
        accessTokenId: token.dataValues.userId,
        expiresAt: token.dataValues.expiresAt,
    };

    return tokenObject;
 } catch (error) {
     throw error;
 }
 };

 const createResetToken = async (userId: number, resetTokenExpiresAt: Date): Promise<Token> =>{
    try {
     const token = await resetTokenModel.create({ userId: userId, expiresAt: resetTokenExpiresAt });

     const tokenObject: Token = {
        id: token.dataValues.id,
        userId: token.dataValues.userId,
        expiresAt: token.dataValues.expiresAt,
    };
    return tokenObject;
 } catch (error) {
     throw error;
 }
 };

 const updateUserPassword = async(user: any, password: string): Promise<void> =>{
    await user.update({ password: password });
 };

 const setExpiredResetToken = async(userId: number): Promise<void> =>{
    await resetTokenModel.update({ expiresAt: new Date() }, { where: { userId: userId } });
 };

export default {
    createUser,
    findUserByEmail,
    createAccessToken,
    createRefreshToken,
    createResetToken,
    updateUserPassword,
    setExpiredResetToken
};

export type {User};