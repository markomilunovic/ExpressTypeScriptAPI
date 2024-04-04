import { Request, Response } from 'express';
import authService from '../services/authService';
import type{ UserRegisterRequestBody, UserLoginRequestBody, ForgotPasswordRequestBody, ResetPasswordRequestBody } from '../common/interfaces/authInterface';
import {isError} from '../common/types/types';
import dotenv from 'dotenv';
dotenv.config();


//Registering a new user
const register = async (req: Request<{}, {}, UserRegisterRequestBody>, res: Response): Promise<void> => {
    try {
        await authService.registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (isError(error)) {
            if (error.message === 'Missing information') {
                res.status(400).json({ message: 'Missing information' });
            } else if (error.message === 'User already exists') {
                res.status(400).json({ message: 'User already exists' });
            } else {
                res.status(500).json({ message: 'Registration failed' });
            }
        } else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
};

//Logging in a new user
const login = async (req: Request<{}, {}, UserLoginRequestBody>, res: Response): Promise<void> => {
    try {
        const { accessToken, refreshToken, user } = await authService.loginUser(req.body);
        res.status(200).json({ accessToken, refreshToken, user });
    } catch (error) {
        if (isError(error)){
        if (error.message === 'User does not exist') {
            res.status(400).json({ message: 'User does not exist' });
        } else if (error.message === 'Wrong Password') {
            res.status(401).json({ message: 'Wrong Password' });
        } else {
            res.status(500).json({ message: 'Login failed' });
        }
    }}
};

const forgotPassword = async (req: Request<{}, {}, ForgotPasswordRequestBody>, res: Response): Promise<void> => {
    try {
        await authService.forgotPassword(req.body);
        res.status(200).json({ message: 'Reset password link sent to your email' });
    } catch (error) {
        if (isError(error)){
        if (error.message === 'User not found') {
            res.status(404).json({ message: 'User not found' });
        }
        else if (error.message === 'Failed to send email') {
            res.status(400).json({ message: 'Failed to send email' });
        }
        else if (error.message === 'SENDGRID_API_KEY not a string') {
            res.status(400).json({ message: 'SENDGRID_API_KEY is not a string' });
        }
        else if (error.message === 'EMAIL_USER not a string') {
            res.status(400).json({ message: 'EMAIL_USER is not a string' });
        }
         else {
            res.status(500).json({ message: 'Failed to process forgot password request' });
        }}
    }
};

const resetPassword = async (req: Request<{}, {}, ResetPasswordRequestBody>, res: Response): Promise<void> => {
    try {
        await authService.resetPassword(req.body);
        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        if (isError(error)){
        if (error.name === 'User not found') {
            res.status(400).json({ message: 'User not found.' });
        }
        else if (error.name === 'Same Password') {
            res.status(400).json({ message: 'New password cannot be the same as the current password' });
        }
        else if (error.name === 'TokenExpiredError') {
            res.status(400).json({ message: 'Reset password link expired. Please request a new one.' });
        }
    }   else{
        res.status(500).json({ message: 'Failed to reset password' });
        }
    }
};

   export {
    register,
    login,
    forgotPassword,
    resetPassword
};