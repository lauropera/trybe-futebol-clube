import 'express-async-errors';
import { Router } from 'express';
import { UserController } from '../controllers';
import authMiddleware from '../middlewares/AuthMiddleware';

const router = Router();

const userController = new UserController();

router.post('/', userController.login);
router.get('/validate', authMiddleware, userController.getUserRole);

export default router;
