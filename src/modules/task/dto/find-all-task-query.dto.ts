import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsPositive } from 'class-validator';
import { SortDirection } from '../../../common/sort-direction.enum';

export enum TaskSortBy {
  id = 'id',
  severity = 'severity',
  title = 'title',
}

export class FindAllTaskQueryDto {
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

  @IsOptional()
  @IsEnum(TaskSortBy)
  sortBy?: TaskSortBy;

  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection?: SortDirection;

  @IsOptional()
  search?: string;
}
