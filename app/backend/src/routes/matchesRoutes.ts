import 'express-async-errors';
import { Router } from 'express';
import { MatchesController } from '../controllers';

const matchesController = new MatchesController();

const router = Router();

router.get('/', matchesController.listAllMatches);

export default router;
