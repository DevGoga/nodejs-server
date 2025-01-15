import expressSession from 'express-session';

export const SessionMiddleware = expressSession({
  secret: 'my_secret',
  resave: false,
  saveUninitialized: false,
  name: 'session_id',
});

declare module 'express-session' {
  interface SessionData {
    user: any; // с UserModel почему то ругается
  }
}
