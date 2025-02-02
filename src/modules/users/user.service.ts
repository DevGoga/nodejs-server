import { compareSync, hashSync } from 'bcrypt';
import { inject, injectable } from 'inversify';
import { appConfig } from '../../config';
import { UserModel } from '../../database/models';
import { RedisService } from '../../database/redis/redis.service';
import { BadRequestException, NotFoundException, UnauthorizedException } from '../../exceptions';
import { RegistrationUserDto, UpdateUserDto } from './dto';
import { JwtService } from './jwt.service';

@injectable()
export class UserService {
  constructor(
    @inject(JwtService) private readonly jwtService: JwtService,
    @inject(RedisService) private readonly redisService: RedisService,
  ) {}

  async registration(dto: RegistrationUserDto) {
    const user = await UserModel.findOne({ where: { nick: dto.nick } });

    if (user) {
      throw new BadRequestException(`A user with this nickname already exists`);
    }

    const hash = hashSync(dto.password, appConfig.passwordRounds);

    await UserModel.create({ nick: dto.nick, password: hash });

    return true;
  }

  async profile(id: UserModel['id']) {
    const user = await UserModel.findByPk(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async login(dto: RegistrationUserDto) {
    const user = await UserModel.findOne({ where: { nick: dto.nick } });

    if (!user) {
      throw new UnauthorizedException(`A user with this nickname: ${dto.nick} is missing`);
    }

    const isHashValid = compareSync(dto.password, user.password);

    if (!isHashValid) {
      throw new UnauthorizedException(`A user with this password is missing`);
    }

    const pair = this.jwtService.makeTokenPair(user.id);

    await this.redisService.set(`refresh:user-${user.id}`, { refreshToken: pair.refreshToken });

    return pair;
  }

  async update(id: UserModel['id'], dto: UpdateUserDto) {
    const user = await UserModel.findByPk(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user.update(dto);
  }
}
