import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../common/interfaces/userInterface';
import { CustomRequest } from '../common/interfaces/middlewareInterface';
import dotenv from 'dotenv';

dotenv.config();

const verifyJWT = (req: CustomRequest, res: Response, next: NextFunction): Response<any, Record<string, any>> => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.sendStatus(401);
    }
    const token: string = authHeader.split(' ')[1];
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    if (!accessTokenSecret) {
        return res.sendStatus(500); 
    }

    jwt.verify(token, accessTokenSecret, (error, decoded) => {
        if (error || !decoded || typeof decoded !== 'object' || !('user' in decoded)) {
            return res.sendStatus(403);
        }
        //req.userId = decoded.userId;
        // Attach user object to request
        const user: User = decoded.user;
        req.user = user;
        next();
        return;
    });
    return res.sendStatus(500);
};

export default verifyJWT;
