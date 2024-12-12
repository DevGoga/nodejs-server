import express from 'express';
import taskController from '../task/task.controller';

export const taskRouter = express.Router();

taskRouter.post('', (req, res) => {
  taskController.create(req, res);
});
taskRouter.post('/:id/time', (req, res) => {
  res.status(501).send('Not implemented');
});

taskRouter.get('', (req, res) => {
  res.status(501).send('Not implemented');
});
taskRouter.get('/:id', (req, res) => {
  taskController.getById(req, res);
});
taskRouter.get('/my/authored', (req, res) => {
  res.status(501).send('Not implemented');
});
taskRouter.get('/my/assigned', (req, res) => {
  res.status(501).send('Not implemented');
});

taskRouter.put('/:id', (req, res) => {
  taskController.update(req, res);
});

taskRouter.delete('/:id', (req, res) => {
  taskController.delete(req, res);
});
