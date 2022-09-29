import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ResumesService } from '../resumes.service';
import { CreateResumeDto } from '../dto/create-resume.dto';
import { UpdateResumeDto } from '../dto/update-resume.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ERoleName } from 'src/shared/type';
import { Roles } from 'src/decorators/role.decorator';
import { RolesGuard } from 'src/guards/role.guard';

@Controller('resumes')
@ApiTags('employee.resume')
@UseGuards(RolesGuard)
@ApiBearerAuth()
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @Post()
  @Roles(ERoleName.EMPLOYEES)
  @ApiOperation({
    operationId: 'employeeCreateResume',
    description: 'Operation for employee create resume',
    summary: 'employee create resume',
  })
  create(@Body() createResumeDto: CreateResumeDto) {
    return this.resumesService.createResume(createResumeDto);
  }

  @Patch(':resumeId')
  @Roles(ERoleName.EMPLOYEES)
  @ApiOperation({
    operationId: 'employeeUpdateResume',
    description: 'Operation for employee update resume',
    summary: 'employee update resume',
  })
  update(
    @Param('resumeId') resumeId: string,
    @Body() updateResumeDto: UpdateResumeDto,
  ) {
    return this.resumesService.updateEmployeeResume(resumeId, updateResumeDto);
  }

  @Delete(':resumeId')
  @ApiOperation({
    operationId: 'employeeDeleteResume',
    description: 'Operation for employee delete resume',
    summary: 'employee delete resume',
  })
  remove(@Param('resumeId') resumeId: string) {
    return this.resumesService.deleteResume(resumeId);
  }
}
