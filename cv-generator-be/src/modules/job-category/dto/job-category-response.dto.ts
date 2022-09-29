import { ApiProperty } from '@nestjs/swagger';

export class JobCategoryResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  companyId: string;

  @ApiProperty()
  isDefault: boolean;
}
