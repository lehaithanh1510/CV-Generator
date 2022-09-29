import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class JobPostResponseDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  companyId: string;

  @ApiProperty()
  requirement: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  locations: string[];

  @ApiProperty()
  keywords: string[];

  @ApiPropertyOptional()
  categoryIds?: string[];
}
