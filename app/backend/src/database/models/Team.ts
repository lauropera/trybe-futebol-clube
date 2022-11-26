import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';

interface ITeam {
  id: number;
  teamName: string;
}

type ITeamCreationAttrs = Omit<ITeam, 'id'>;

class Team extends Model implements Team {
  declare id: number;
  declare teamName: string;
}

Team.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: STRING,
  },
  {
    sequelize: db,
    tableName: 'teams',
    underscored: true,
    timestamps: false,
  },
);

export default Team;
export { ITeam, ITeamCreationAttrs };
