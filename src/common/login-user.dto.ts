import { Type } from 'class-transformer';
import { IsNumber, IsString, MinLength } from 'class-validator';

export class LoginPasswordDto {
  @IsString()
  @MinLength(1)
  login: string;

  @IsNumber()
  @MinLength(5)
  @Type(() => Number)
  password: number;
}
