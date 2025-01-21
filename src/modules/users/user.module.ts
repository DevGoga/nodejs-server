import { Container } from 'inversify';
import { UserController } from './user.controller';
import { UserService } from './user.service';

export const createUserModule = () => {
  const container = new Container();

  container.bind(UserService).to(UserService).inSingletonScope();
  container.bind(UserController).to(UserController).inSingletonScope();

  return container;
};
