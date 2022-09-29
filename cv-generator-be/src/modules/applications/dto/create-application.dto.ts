import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ownerId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  jobId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  resumeId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  message?: string;
}
