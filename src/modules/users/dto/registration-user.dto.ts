import { IsString, MinLength } from 'class-validator';

export class RegistrationUserDto {
  @IsString()
  @MinLength(3)
  nick: string;

  @IsString()
  @MinLength(5)
  password: string;
}
