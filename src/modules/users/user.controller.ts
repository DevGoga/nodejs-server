import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../../common/base.controller';
import { Route } from '../../common/types';
import { UnauthorizedException } from '../../exceptions';
import { AuthGuard } from '../../guards';
import { validation } from '../../utilites';
import { RegistrationUserDto } from './dto/registration-user.dto';
import { UserService } from './user.service';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(UserService)
    private readonly userService: UserService,
  ) {
    super();
    this.initRoutes();
  }

  initRoutes() {
    const routes: Route[] = [
      { path: '/register', method: 'post', handler: this.registration },
      { path: '/login', method: 'post', handler: this.login },
      { path: '/profile', method: 'get', handler: this.profile, middleware: [AuthGuard] },
    ];

    this.addRoute(routes);
  }

  async registration(req: Request, res: Response) {
    const dto = validation(RegistrationUserDto, req.body);

    await this.userService.registration(dto);

    res.json({ success: true });
  }

  async profile(req: Request, res: Response) {
    const id = req.session.user?.id;

    if (!id) {
      throw new UnauthorizedException();
    }

    const result = await this.userService.profile(id);

    res.json(result);
  }

  async login(req: Request, res: Response) {
    const dto = validation(RegistrationUserDto, req.body);

    const result = await this.userService.login(dto);

    req.session.user = result;

    res.json(result);
  }
}
