import { IsEnum, IsString, MinLength } from 'class-validator';

export enum Severity {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

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
