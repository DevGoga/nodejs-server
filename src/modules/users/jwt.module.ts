import { Container } from 'inversify';
import { JwtService } from './jwt.service';

export const createJwtModule = () => {
  const container = new Container();

  container.bind(JwtService).toSelf().inSingletonScope();

  return container;
};
