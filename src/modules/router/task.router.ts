import express from 'express';

export const taskRouter = express.Router();

taskRouter.post('', (req, res) => {
  res.status(501).send('Not implemented');
});
taskRouter.post('/:id/time', (req, res) => {
  res.status(501).send('Not implemented');
});

taskRouter.get('', (req, res) => {
  res.status(501).send('Not implemented');
});
taskRouter.get('/:id', (req, res) => {
  res.status(501).send('Not implemented');
});
taskRouter.get('/my/authored', (req, res) => {
  res.status(501).send('Not implemented');
});
taskRouter.get('/my/assigned', (req, res) => {
  res.status(501).send('Not implemented');
});

taskRouter.put('/:id', (req, res) => {
  res.status(501).send('Not implemented');
});

taskRouter.delete('/:id', (req, res) => {
  res.status(501).send('Not implemented');
});
