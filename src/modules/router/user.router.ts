import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import express from 'express';
import { BadRequestException } from '../../errors';
import { UserLoginDto } from '../task/dto';

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
  const dto = plainToInstance(UserLoginDto, req.params);
  const errors = validateSync(dto);
  if (errors.length) {
    const constraints = errors[0].constraints;
    let message = 'Unknown validation error';

    if (constraints) {
      message = constraints[Object.keys(constraints)[0]];
    }

    throw new BadRequestException(message);
  }
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
