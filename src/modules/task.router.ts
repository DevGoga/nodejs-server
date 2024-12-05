import express from 'express';

export const taskRouter = express.Router();

taskRouter.post('', (req, res) => {
  res.send('create task');
});
taskRouter.post('/:id/time', (req, res) => {
  res.send('add time in task');
});

taskRouter.get('', (req, res) => {
  res.send('get task');
});
taskRouter.get('/:id', (req, res) => {
  res.send('one task');
});
taskRouter.get('/my/authored', (req, res) => {
  res.send('get authored');
});
taskRouter.get('/my/assigned', (req, res) => {
  res.send('get assigned');
});

taskRouter.put('/:id', (req, res) => {
  res.send('update task');
});

taskRouter.delete('/:id', (req, res) => {
  res.send('delete task');
});
