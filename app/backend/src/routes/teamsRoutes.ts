import 'express-async-errors';
import { Router } from 'express';
import { TeamsController } from '../controllers';

const router = Router();

const teamsController = new TeamsController();

router.get('/', teamsController.listAllTeams);
router.get('/:id', teamsController.listTeamById);

export default router;
