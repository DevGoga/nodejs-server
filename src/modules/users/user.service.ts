import { RegistrationUserDto } from './dto/registration-user.dto';
import { UserRepository } from './user.repository';
import { User } from './user.types';

export const UserService = {
  registration(dto: RegistrationUserDto): User {
    const user = UserRepository.registration(dto);

    if (dto.nick === user.nick) {
      throw new Error(`A user with this nickname already exists`);
    }

    return UserRepository.registration(dto);
  },
};
