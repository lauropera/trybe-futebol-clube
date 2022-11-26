import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

type IUserCreationAttrs = Omit<IUser, 'id'>;

type IUserReturned = Omit<IUser, 'password'>;

class User extends Model<IUser, IUserCreationAttrs> {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

User.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: STRING,
    role: STRING,
    email: STRING,
    password: STRING,
  },
  {
    sequelize: db,
    modelName: 'user',
    tableName: 'users',
    timestamps: false,
  },
);

export default User;
export { IUser, IUserCreationAttrs, IUserReturned };
