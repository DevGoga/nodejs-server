import { compareSync, hashSync } from 'bcrypt';
import { appConfig } from '../../config';
import { UnauthorizedException } from '../../exceptions';
import { RegistrationUserDto } from './dto/registration-user.dto';
import { UserRepository } from './user.repository';
import { User } from './user.types';

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  registration(dto: RegistrationUserDto): User {
    const user = this.repository.findByNick(dto.nick);

    if (user) {
      throw new Error(`A user with this nickname already exists`);
    }

    const hash = hashSync(dto.password, appConfig.passwordRounds);

    return this.repository.save({ ...dto, password: hash });
  }

  profile(id: User['id']) {
    const user = this.repository.read(id);

    if (user === null) {
      throw new Error(`Profile with id:${id} not found`);
    }

    return user;
  }

  login(dto: RegistrationUserDto) {
    const user = this.repository.findByNick(dto.nick);

    if (user === null) {
      throw new UnauthorizedException(`A user with this nickname: ${dto.nick} is missing`);
    }

    const isHashValid = compareSync(dto.password, user.password);

    if (!isHashValid) {
      throw new UnauthorizedException(`A user with this password is missing`);
    }

    return user;
  }
}
