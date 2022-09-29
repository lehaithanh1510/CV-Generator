import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EmployerFilterApplicationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  jobId: string;
}
