import Match from '../database/models/Match';

export default interface IMatch extends Match {
  teamHome: { teamName: string };
  teamAway: { teamName: string };
}
