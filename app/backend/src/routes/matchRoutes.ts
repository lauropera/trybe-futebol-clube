import 'express-async-errors';
import { Router } from 'express';
import { matchController } from './controllerInstances';
import authMiddleware from '../middlewares/AuthMiddleware';

const router = Router();

router.get('/', matchController.listAll);
router.post('/', authMiddleware, matchController.create);
router.patch('/:id/finish', matchController.finish);
router.patch('/:id', matchController.update);

export default router;
