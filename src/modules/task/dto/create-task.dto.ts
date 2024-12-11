import { IsEnum, IsString, MinLength } from 'class-validator';
import { Severity } from '../task.types';

export class CreateTaskDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(1)
  description: string;

  @IsEnum(Severity)
  severity: Severity;
}
