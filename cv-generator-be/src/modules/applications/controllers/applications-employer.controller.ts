import { Controller, Post, Param, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';
import { RolesGuard } from 'src/guards/role.guard';
import { ERoleName } from 'src/shared/type';
import { EmployerFilterApplicationDto } from '../dto/application-filter.dto';
import { ApplicationsEmployerService } from '../providers/applications-employer.service';

@ApiTags('employer.application')
@Controller('/employer/applications')
@UseGuards(RolesGuard)
@ApiBearerAuth()
export class EmployerApplicationsController {
  constructor(
    private readonly applicationsEmployerService: ApplicationsEmployerService,
  ) {}

  @Get()
  @Roles(ERoleName.EMPLOYERS)
  @ApiOperation({
    operationId: 'employerGetApplications',
    description: 'Operation for employee to get applications',
    summary: 'employer get applications',
  })
  getApplication(@Query() getApplicationDto: EmployerFilterApplicationDto) {
    return this.applicationsEmployerService.getApplicationForJob(
      getApplicationDto.jobId,
    );
  }

  @Post(':id/accept')
  @Roles(ERoleName.EMPLOYERS)
  @ApiOperation({
    operationId: 'employerAcceptApplication',
    description: 'Operation for employer accept application of employee',
    summary: 'employer accept application',
  })
  acceptApplication(@Param('id') id: string) {
    return this.applicationsEmployerService.acceptApplication(id);
  }

  @Post(':id/reject')
  @ApiOperation({
    operationId: 'employerRejectApplication',
    description: 'Operation for employer reject application of employee',
    summary: 'employer reject application',
  })
  rejectApplication(@Param('id') id: string) {
    return this.applicationsEmployerService.rejectApplication(id);
  }
}
