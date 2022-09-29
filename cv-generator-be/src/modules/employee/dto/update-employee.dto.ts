import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class SchoolDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  startingDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  endingDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  degree?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  schoolName?: string;
}

export class WorkingExperienceDto {
  @ApiProperty()
  @IsString()
  position: string;

  @ApiProperty()
  @IsString()
  companyName: string;

  @ApiProperty()
  @IsString()
  responsibility: string;

  @ApiProperty()
  @IsString()
  startingDate: string;

  @ApiProperty()
  @IsString()
  endingDate: string;
}

export class EducationDto {
  @ApiPropertyOptional()
  @Type(() => SchoolDto)
  @ValidateNested()
  highSchool?: SchoolDto;

  @ApiPropertyOptional()
  @Type(() => SchoolDto)
  @ValidateNested()
  university?: SchoolDto;
}
export class UpdateEmployeeDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  profession?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  mobilePhone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  profileDescription?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  facebookLink?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  linkedInLink?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  gitHubLink?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => EducationDto)
  @ValidateNested()
  education?: EducationDto;

  @ApiPropertyOptional({ type: [WorkingExperienceDto] })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => WorkingExperienceDto)
  @ValidateNested({ each: true })
  workingExperience?: WorkingExperienceDto[];
}
