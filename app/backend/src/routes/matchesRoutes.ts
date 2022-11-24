import 'express-async-errors';
import { Router } from 'express';
import { MatchesController } from '../controllers';
import authMiddleware from '../middlewares/AuthMiddleware';

const matchesController = new MatchesController();

const router = Router();

router.get('/', matchesController.listAll);
router.post('/', authMiddleware, matchesController.create);
router.patch('/:id/finish', matchesController.finish);

export default router;
