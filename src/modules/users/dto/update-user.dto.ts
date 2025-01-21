import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  nick?: string;

  @IsOptional()
  @IsString()
  password?: string;
}
