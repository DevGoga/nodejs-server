import { Container } from 'inversify';
import { Server } from './server';

export const createServerModule = (): Container => {
  const container = new Container();

  container.bind(Server).to(Server).inSingletonScope();

  return container;
};
