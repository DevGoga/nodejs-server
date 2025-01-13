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
  @Type(() => String)
  postgresUser: string;

  @IsString()
  @Type(() => String)
  postgresPassword: string;

  @IsString()
  @Type(() => String)
  postgresHost: string;

  @IsNumber()
  @Type(() => Number)
  postgresPort: number;

  @IsString()
  @Type(() => String)
  postgresdDb: string;
}
