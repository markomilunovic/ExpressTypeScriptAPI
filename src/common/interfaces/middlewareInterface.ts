import type { User } from '..//interfaces/userInterface';
import { Request } from 'express';

// Define a custom interface for the Express Request object
interface CustomRequest extends Request {
    //userId?: string;
    user?: User;
};

export type {
    CustomRequest
};