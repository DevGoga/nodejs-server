import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsString } from 'class-validator';

export class AppConfig {
  @IsInt()
  @Type(() => Number)
  passwordRounds: number;

  @IsInt()
  @Type(() => Number)
  port: number;

  @IsString()
  postgresUser: string;

  @IsString()
  postgresPassword: string;

  @IsString()
  postgresHost: string;

  @IsNumber()
  @Type(() => Number)
  postgresPort: number;

  @IsString()
  postgresdDb: string;

  @IsString()
  redisUrl: string;
}
