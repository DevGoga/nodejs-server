import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class AppConfig {
  @IsInt()
  @Type(() => Number)
  passwordRounds: number;

  @IsInt()
  @Type(() => Number)
  port: number;

  @IsString()
  redisUrl: string;
}
