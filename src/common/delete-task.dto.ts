import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class DeleteTaskParamsDto {
  @IsNumber()
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  id: number;
}
