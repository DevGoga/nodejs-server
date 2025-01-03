import { Request, Response } from 'express';
import { BaseController } from '../../common/base.controller';
import { Route } from '../../common/types';
import { AuthGuard } from '../../guards';
import { validation } from '../../utilites';
import { RegistrationUserDto } from './dto/registration-user.dto';
import { UserService } from './user.service';

export class UserController extends BaseController {
  constructor(private readonly service: UserService) {
    super();
    this.initRoutes();
  }

  initRoutes() {
    const routes: Route[] = [
      { path: '/register', method: 'post', handler: this.registration },
      { path: '/login', method: 'post', handler: this.login },
      //   res.status(501).send('Not implemented');
      // });
      // userRouter.post('/refresh', (req, res) => {
      //   res.status(501).send('Not implemented');
      // });
      // userRouter.post('/password/restore', (req, res) => {
      //   res.status(501).send('Not implemented');
      // });
      // userRouter.post('/:id/block', (req, res) => {
      //   res.status(501).send('Not implemented');
      // });
      // userRouter.post('/:id/unblock', (req, res) => {
      //   res.status(501).send('Not implemented');
      // });

      { path: '/profile', method: 'get', handler: this.profile, middleware: [AuthGuard] },
      // userRouter.get('', (req, res) => {
      //   res.status(501).send('Not implemented');
      // });
      // userRouter.get('/profile/:id', (req, res) => {
      //   res.status(501).send('Not implemented');
      // });
      // userRouter.get('/profile/telegram-link', (req, res) => {
      //   res.status(501).send('Not implemented');
      // });

      //   userRouter.put('/profile', (req, res) => {
      //     res.status(501).send('Not implemented');
      //   });
      // userRouter.put('/password/change', (req, res) => {
      //   res.status(501).send('Not implemented');
      // });
    ];

    this.addRoute(routes);
  }

  registration(req: Request, res: Response) {
    const dto = validation(RegistrationUserDto, req.body);

    const result = this.service.registration(dto);

    res.json(result);
  }

  profile(req: Request, res: Response) {
    const id = req.session.user?.id;

    if (!id) {
      throw new Error('Unauthorized');
    }

    const result = this.service.profile(id);

    res.json(result);
  }

  login(req: Request, res: Response) {
    const dto = validation(RegistrationUserDto, req.body);

    const result = this.service.login(dto);

    req.session.user = result;

    res.json(result);
  }
}
