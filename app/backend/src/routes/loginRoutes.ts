import 'express-async-errors';
import { Router } from 'express';
import { userController } from './controllerInstances';
import authMiddleware from '../middlewares/AuthMiddleware';

const router = Router();

router.post('/', userController.login);
router.get('/validate', authMiddleware, userController.getRole);

export default router;
