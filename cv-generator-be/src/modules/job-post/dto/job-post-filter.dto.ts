import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EmployeeSearchJobPostDto {
  @ApiPropertyOptional()
  @IsOptional()
  maxSalary?: number;

  @ApiPropertyOptional()
  @IsOptional()
  minSalary?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  keyword?: string;
}
