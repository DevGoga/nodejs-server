import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsPositive } from 'class-validator';
export class DeleteTaskDto {
  @IsNumber()
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  id: number;
}
