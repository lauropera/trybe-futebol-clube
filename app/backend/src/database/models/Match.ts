import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import Team from './Team';

interface IMatch extends IMatchCreationAttrs {
  id: number;
  inProgress: boolean;
}

interface IMatchUpdate {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

interface IMatchCreationAttrs extends IMatchUpdate {
  homeTeam: number;
  awayTeam: number;
}

interface IMatchReturned extends IMatch {
  teamHome: {
    teamName: string;
  };
  teamAway: {
    teamName: string;
  };
}

class Match extends Model implements IMatch {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeam: INTEGER,
    homeTeamGoals: INTEGER,
    awayTeam: INTEGER,
    awayTeamGoals: INTEGER,
    inProgress: BOOLEAN,
  },
  {
    sequelize: db,
    modelName: 'match',
    tableName: 'matches',
    underscored: true,
    timestamps: false,
  },
);

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeTeamMatches' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayTeamMatches' });

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Match;
export { IMatch, IMatchUpdate, IMatchCreationAttrs, IMatchReturned };
