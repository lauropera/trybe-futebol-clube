import 'express-async-errors';
import { Router } from 'express';
import { MatchesService } from '../services';
import { MatchesController } from '../controllers';

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

const router = Router();

router.get('/', matchesController.listAllMatches);

export default router;
