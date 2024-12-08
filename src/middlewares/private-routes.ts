import { NextFunction, Request, Response } from 'express';
export const privateRoutes = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Запущена проверка доступа!`);
  if (req.path === '/private' && (req.method === 'PUT' || req.method === 'POST')) {
    console.log(`Доступа нет!`);
    res.send('Вы пытаетесь получить доступ к приватному пути или же использовали метод PUT или POST! Это запрещено!');
    return;
  }
  console.log(`Доступ есть! Вызываем следующие обработчики!`);
  next();
};
