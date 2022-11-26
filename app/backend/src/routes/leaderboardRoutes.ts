import 'express-async-errors';
import { Router } from 'express';
import { leaderboardController } from './controllerInstances';

const router = Router();

router.get('/home', leaderboardController.listHomeTeams);
router.get('/away', leaderboardController.listAwayTeams);

export default router;
