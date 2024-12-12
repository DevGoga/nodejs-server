import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsPositive, MinLength } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  @MinLength(1)
  page?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  @MinLength(1)
  limit?: number;
}
