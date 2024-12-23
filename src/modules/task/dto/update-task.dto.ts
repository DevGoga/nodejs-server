import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Severity } from '..';

export class UpdateTaskBodyDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  description?: string;

  @IsOptional()
  @IsEnum(Severity)
  severity?: Severity;
}
