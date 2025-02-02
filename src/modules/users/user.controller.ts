import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../../common/base.controller';
import { Route } from '../../common/types';
import { UnauthorizedException } from '../../exceptions';
import { JwtGuard } from '../../guards';
import { validation } from '../../utilites';
import { RegistrationUserDto, UpdateUserDto } from './dto';
import { JwtService } from './jwt.service';
import { UserService } from './user.service';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(UserService)
    private readonly userService: UserService,
    @inject(JwtService)
    private readonly jwtService: JwtService,
  ) {
    super();
    this.initRoutes();
  }

  initRoutes() {
    const jwtGuard = JwtGuard(this.jwtService);

    const middleware = [jwtGuard];

    const routes: Route[] = [
      { path: '/register', method: 'post', handler: this.registration },
      { path: '/login', method: 'post', handler: this.login },
      { path: '/profile', method: 'get', handler: this.profile, middleware },
      { path: '/update', method: 'put', handler: this.update, middleware },
    ];

    this.addRoute(routes);
  }

  async registration(req: Request, res: Response) {
    const dto = validation(RegistrationUserDto, req.body);

    await this.userService.registration(dto);

    res.json({ success: true });
  }

  async profile(req: Request, res: Response) {
    const id = res.locals.user.id;

    if (!id) {
      throw new UnauthorizedException();
    }

    const result = await this.userService.profile(id);

    res.json(result);
  }

  async login(req: Request, res: Response) {
    const dto = validation(RegistrationUserDto, req.body);

    const result = await this.userService.login(dto);

    res.json(result);
  }

  async update(req: Request, res: Response) {
    const dto = validation(UpdateUserDto, req.body);
    const id = res.locals.user.id;

    if (!id) {
      throw new UnauthorizedException();
    }

    const result = await this.userService.update(id, dto);

    res.json(result);
  }
}
