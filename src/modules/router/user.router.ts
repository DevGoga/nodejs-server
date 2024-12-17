import express from 'express';

export const userRouter = express.Router();

userRouter.post('/register', (req, res) => {
  res.status(501).send('Not implemented');
});
userRouter.post('/logout', (req, res) => {
  res.status(501).send('Not implemented');
});
userRouter.post('/refresh', (req, res) => {
  res.status(501).send('Not implemented');
});
userRouter.post('/password/restore', (req, res) => {
  res.status(501).send('Not implemented');
});
userRouter.post('/:id/block', (req, res) => {
  res.status(501).send('Not implemented');
});
userRouter.post('/:id/unblock', (req, res) => {
  res.status(501).send('Not implemented');
});
userRouter.post('/login', (req, res) => {
  res.status(200).json('Login success!');
});

userRouter.get('', (req, res) => {
  res.status(501).send('Not implemented');
});
userRouter.get('/profile', (req, res) => {
  res.status(501).send('Not implemented');
});
userRouter.get('/profile/:id', (req, res) => {
  res.status(501).send('Not implemented');
});
userRouter.get('/profile/telegram-link', (req, res) => {
  res.status(501).send('Not implemented');
});

userRouter.put('/profile', (req, res) => {
  res.status(501).send('Not implemented');
});
userRouter.put('/password/change', (req, res) => {
  res.status(501).send('Not implemented');
});
