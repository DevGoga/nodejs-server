import { IsString, MinLength } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @MinLength(1)
  nick: string;

  @IsString()
  @MinLength(1)
  password: string;
}
