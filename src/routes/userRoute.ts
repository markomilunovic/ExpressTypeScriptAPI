import express, { Router } from 'express';
const router: Router = express.Router();
import authMiddleware from '../middleware/authMiddleware';
import { 
    createUser, 
    getAllUsers, 
    getUserById, 
    updateUser, 
    deleteUser 
} from '../controllers/userController';

router.use(authMiddleware);
router.route('/').post(createUser).get(getAllUsers);
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

export default router;
