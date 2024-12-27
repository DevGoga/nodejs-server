import { hashSync } from 'bcrypt';
import { appConfig } from '../../config';
import { TaskModel, UserModel } from '../../database/models';
import { RegistrationUserDto } from './dto/registration-user.dto';
import { UserRepository } from './user.repository';
import { User } from './user.types';

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async registration(dto: RegistrationUserDto): Promise<UserModel> {
    const user = await UserModel.findOne({ where: { nick: dto.nick } });

    if (user) {
      throw new Error(`A user with this nickname already exists`);
    }

    const hash = hashSync(dto.password, appConfig.passwordRounds);

    return UserModel.create({ ...dto, password: hash });
  }

  async profile(id: User['id']) {
    const user = await UserModel.findByPk(id, {
      include: [TaskModel],
    });

    if (user === null) {
      throw new Error(`Profile with id:${id} not found`);
    }

    return user;
  }

  async login(dto: RegistrationUserDto) {
    const user = await UserModel.findOne({ where: { nick: dto.nick } });

    if (user === null) {
      throw new Error(`A user with this nickname: ${dto.nick} is missing`);
    }

    return user;
  }
}
