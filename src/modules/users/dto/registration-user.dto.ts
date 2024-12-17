import { IsEnum, IsString, MinLength } from 'class-validator';
import { Role } from '../user.types';

export class RegistrationUserDto {
  @IsString()
  @MinLength(3)
  nick: string;

  @IsString()
  @MinLength(5)
  password: string;

  @IsEnum(Role)
  role: Role;
}
