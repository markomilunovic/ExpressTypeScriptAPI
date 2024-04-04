import express, { Router } from 'express';
const router: Router = express.Router();
import { register, login, forgotPassword, resetPassword } from '../controllers/authController';

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password').post(resetPassword); 

export default router;
