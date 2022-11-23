import * as bcryptjs from 'bcryptjs';
import { ILogin, IUser } from '../../interfaces';

export const userMock: IUser = {
  id: 1,
  username: 'Arezu',
  role: 'admin',
  email: 'arezu@pokemail.com',
  password: await bcryptjs.hash('arezu123', 8),
};

export const loginMock: ILogin = {
  email: 'arezu@pokemail.com',
  password: await bcryptjs.hash('arezu123', 8),
};

export const invalidLogins: ILogin[] = [
  {
    email: '',
    password: 'amongus',
  },
  {
    email: 'cynthia@pokemail.com',
    password: '',
  },
  {
    email: 'cynthia@pokemail',
    password: await bcryptjs.hash('arezu123', 16),
  },
];
