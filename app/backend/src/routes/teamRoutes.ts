import 'express-async-errors';
import { Router } from 'express';
import { teamController } from './controllerInstances';

const router = Router();

router.get('/', teamController.listAllTeams);
router.get('/:id', teamController.listTeamById);

export default router;
