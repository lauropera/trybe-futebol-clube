import 'express-async-errors';
import { Router } from 'express';
import { UserService } from '../services';
import { UserController } from '../controllers';
import authMiddleware from '../middlewares/AuthMiddleware';

const router = Router();

const userService = new UserService();
const userController = new UserController(userService);

router.post('/', userController.login);
router.get('/validate', authMiddleware, UserController.getUserRole);

export default router;
