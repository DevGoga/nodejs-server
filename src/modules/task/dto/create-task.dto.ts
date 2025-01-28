import { IsEnum, IsNumber, IsString, MinLength } from 'class-validator';

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

  @IsNumber()
  assigneeId: number;

  @IsEnum(Severity)
  severity: Severity;
}
