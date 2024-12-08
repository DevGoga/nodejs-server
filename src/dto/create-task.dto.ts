import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Severity } from '../task.types';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsEnum(Severity)
  severity: Severity;
}
