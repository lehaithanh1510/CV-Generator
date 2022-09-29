import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FilterEmployerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  employerId: string;
}
