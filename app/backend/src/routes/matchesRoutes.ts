import 'express-async-errors';
import { Router } from 'express';
import { MatchesController } from '../controllers';
import authMiddleware from '../middlewares/AuthMiddleware';

const matchesController = new MatchesController();

const router = Router();

router.get('/', matchesController.listAllMatches);
router.post('/', authMiddleware, matchesController.createMatch);

export default router;
