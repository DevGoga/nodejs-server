import { RegistrationUserDto } from './dto/registration-user.dto';
import { UserRepository } from './user.repository';
import { User } from './user.types';

export const UserService = {
  registration(dto: RegistrationUserDto): User {
    return UserRepository.registration(dto);
  },
};
