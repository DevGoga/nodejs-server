import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  offset?: number;

  @IsOptional()
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  limit?: number;
}
