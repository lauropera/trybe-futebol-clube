import 'express-async-errors';
import { Router } from 'express';
import { TeamController } from '../controllers';

const router = Router();

const teamController = new TeamController();

router.get('/', teamController.listAllTeams);
router.get('/:id', teamController.listTeamById);

export default router;
