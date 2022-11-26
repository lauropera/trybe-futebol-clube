import {
  UserController,
  MatchController,
  TeamController,
} from '../controllers';

const userController = new UserController();
const matchController = new MatchController();
const teamController = new TeamController();

export { userController, matchController, teamController };
