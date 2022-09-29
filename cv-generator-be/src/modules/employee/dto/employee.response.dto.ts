import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EducationDto, WorkingExperienceDto } from './update-employee.dto';

export class EmployeeResponseDto {
  @ApiProperty()
  userId: string;

  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  avatar?: string;

  @ApiPropertyOptional()
  gender?: string;

  @ApiPropertyOptional()
  age?: number;

  @ApiPropertyOptional()
  profession?: string;

  @ApiPropertyOptional()
  location?: string;

  @ApiPropertyOptional()
  mobilePhone?: string;

  @ApiPropertyOptional()
  profileDescription?: string;

  @ApiPropertyOptional()
  facebookLink?: string;

  @ApiPropertyOptional()
  linkedInLink?: string;

  @ApiPropertyOptional()
  gitHubLink?: string;

  @ApiPropertyOptional()
  education?: EducationDto;

  @ApiPropertyOptional()
  skills?: string;

  @ApiPropertyOptional()
  workingExperience?: WorkingExperienceDto[];
}
