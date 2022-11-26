import {
  UserController,
  MatchController,
  TeamController,
  LeaderboardController,
} from '../controllers';

const userController = new UserController();
const matchController = new MatchController();
const teamController = new TeamController();
const leaderboardController = new LeaderboardController();

export {
  userController,
  matchController,
  teamController,
  leaderboardController,
};
