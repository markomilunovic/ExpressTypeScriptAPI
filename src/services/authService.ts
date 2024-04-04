import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';
import authRepository from '../repositories/authRepository';
import {isString} from '../common/types/types';
import type { UserRegisterRequestBody, UserLoginRequestBody, ForgotPasswordRequestBody, ResetPasswordRequestBody, User } from '../common/interfaces/authInterface';
import dotenv from 'dotenv';

dotenv.config();

const ACCESS_TOKEN_EXP_TIME_IN_DAYS = 1;
const REFRESH_TOKEN_EXP_TIME_IN_DAYS = 7;
const RESET_TOKEN_EXP_TIME_IN_MINUTES = 15;


const registerUser = async (body: UserRegisterRequestBody): Promise<User> => {
    try {
        const { username, password, email, firstName, lastName } = body;

        if (!username || !password || !email || !firstName || !lastName) {
            throw new Error('Missing information');
        }

        const existingUser = await authRepository.findUserByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        return await authRepository.createUser(body);
    } catch (error) {
        throw error;
    }
};


const loginUser = async (body: UserLoginRequestBody): Promise<{ accessToken: string; refreshToken: string; user: User }> => {
    try {
      const { email, password } = body;
      const user = await authRepository.findUserByEmail(email);
      if (!user) {
        throw new Error('User does not exist');
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error('Wrong Password');
      }
  
      const accessTokenExpiresAt = new Date();
      accessTokenExpiresAt.setDate(accessTokenExpiresAt.getDate() + ACCESS_TOKEN_EXP_TIME_IN_DAYS);
  
      const refreshTokenExpiresAt = new Date();
      refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + REFRESH_TOKEN_EXP_TIME_IN_DAYS);
  
      const accessToken = await authRepository.createAccessToken(user.id, accessTokenExpiresAt);
      const refreshToken = await authRepository.createRefreshToken(accessToken.id, refreshTokenExpiresAt);
  /*
      const accessTokenEncode = {
        jti: accessToken.id,
        sub: user.id
      };
  */
      const refreshTokenEncode = {
        jti: refreshToken.id,
        sub: accessToken.id
      };
 /* 
      const accessTokenToken = isString(process.env.ACCESS_TOKEN_SECRET)
      ? jwt.sign(accessTokenEncode, process.env.ACCESS_TOKEN_SECRET, { expiresIn: `${ACCESS_TOKEN_EXP_TIME_IN_DAYS}d` })
      : '';
*/

      const accessTokenToken = isString(process.env.ACCESS_TOKEN_SECRET)
      ? jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: `${ACCESS_TOKEN_EXP_TIME_IN_DAYS}d` })
      : '';

      const refreshTokenToken = isString(process.env.REFRESH_TOKEN_SECRET)
      ? jwt.sign(refreshTokenEncode, process.env.REFRESH_TOKEN_SECRET, { expiresIn: `${REFRESH_TOKEN_EXP_TIME_IN_DAYS}d` })
      : '';


      return { accessToken: accessTokenToken, refreshToken: refreshTokenToken, user: user };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

const forgotPassword = async (body: ForgotPasswordRequestBody): Promise<void> => {
    try {
        const { email } = body;

        const user = await authRepository.findUserByEmail(email);
        if (!user) {
            throw new Error('User does not exist');
        }

        const resetTokenExpiresAt = new Date();
        resetTokenExpiresAt.setMinutes(resetTokenExpiresAt.getMinutes() + RESET_TOKEN_EXP_TIME_IN_MINUTES);

        const resetToken = await authRepository.createResetToken(user.id, resetTokenExpiresAt);

        const resetTokenEncode = {
            jti: resetToken.id,
            email: email
        };

        // Generate a JWT token with the user's email
        const token = isString(process.env.RESET_TOKEN_SECRET)
        ? jwt.sign(resetTokenEncode, process.env.RESET_TOKEN_SECRET, { expiresIn: `${RESET_TOKEN_EXP_TIME_IN_MINUTES}d` })
        : '';

        // Send the reset password link to the user's email
        const emailSent = await sendResetPasswordEmail(email, token, user.id);
        if (!emailSent) {
            throw new Error('Failed to send email');

         }
    }
    catch (error) {
        throw error;
    }
};
const sendResetPasswordEmail = async (email: string, token: string, userId: number): Promise<boolean> => {
    try {
    if (!isString(process.env.SENDGRID_API_KEY)) {
      throw new Error('SENDGRID_API_KEY not a string');
    };
    
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    if (!isString(process.env.EMAIL_USER)) {
      throw new Error('EMAIL_USER not a string');
    };
      const msg = {
        to: email,
        from: process.env.EMAIL_USER,
        subject: 'Reset Your Password',
        text: `http://localhost:3000/auth/reset-password/${userId}/${token}`
      };
  
      const info = await sgMail.send(msg);
      console.log('Email sent:', info);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  };
  const resetPassword = async (body: ResetPasswordRequestBody): Promise<void> => {
    try {
      const { token, newPassword } = body;

    if (typeof process.env.RESET_TOKEN_SECRET !== 'string') {
      throw new Error('RESET_TOKEN_SECRET is not a string');
    };

      const decodedToken = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
 
    if (typeof decodedToken === 'string') {
      throw new Error('Invalid token');
    };
  
      const user = await authRepository.findUserByEmail(decodedToken.email);
      if (!user) {
        throw new Error('User does not exist');
      };
  
      // Check if the new password is different from the current password
      const passwordMatch = await bcrypt.compare(newPassword, user.password);
      if (passwordMatch) {
        throw new Error('Same password');
      };
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      await authRepository.updateUserPassword(user, hashedPassword);
  
      // Set the reset token as expired in the database
      await authRepository.setExpiredResetToken(user.id);
    } catch (error) {
      throw error;
    }
  };

  
export default {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword
};


