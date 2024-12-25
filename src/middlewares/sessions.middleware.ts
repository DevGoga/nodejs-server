import expressSession from 'express-session';
import { User } from '../modules/users/user.types';

export const SessionMiddleware = expressSession({
  secret: 'my_secret',
  resave: false,
  saveUninitialized: false,
  name: 'session_id',
});

declare module 'express-session' {
  interface SessionData {
    user: User;
  }
}
