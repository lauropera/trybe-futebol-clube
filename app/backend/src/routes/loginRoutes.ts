import { Router } from 'express';
import 'express-async-errors';
import { UserService } from '../services';
import { UserController } from '../controllers';

const router = Router();

const userService = new UserService();
const userController = new UserController(userService);

router.post('/', userController.login);

export default router;
