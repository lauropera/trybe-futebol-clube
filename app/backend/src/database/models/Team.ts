import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';

class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: STRING,
}, {
  sequelize: db,
  tableName: 'teams',
  underscored: true,
  timestamps: false,
});

export default Team;
