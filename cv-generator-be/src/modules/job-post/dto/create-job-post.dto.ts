import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateJobPostDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  companyId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  requirement: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  locations: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  keywords: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  categoryIds?: string[];
}
