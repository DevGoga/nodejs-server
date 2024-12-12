import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';
import { Severity } from '../modules/task';

export class UpdateTaskParamsDto {
  @IsNumber()
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  id: number;
}

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
