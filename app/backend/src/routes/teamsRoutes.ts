import 'express-async-errors';
import { Router } from 'express';
import { TeamsService } from '../services';
import { TeamsController } from '../controllers';

const router = Router();

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

router.get('/', teamsController.listAllTeams);
