import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApplicationsEmployeeService } from '../providers/applications-employee.service';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { Roles } from 'src/decorators/role.decorator';
import { ERoleName } from 'src/shared/type';
import { RolesGuard } from 'src/guards/role.guard';

@ApiTags('employee.application')
@Controller('/employee/applications')
@UseGuards(RolesGuard)
@Roles(ERoleName.EMPLOYEES)
@ApiBearerAuth()
export class ApplicationsEmployeeController {
  constructor(
    private readonly applicationsEmployeeService: ApplicationsEmployeeService,
  ) {}

  @Post()
  @ApiOperation({
    operationId: 'employeeCreateApplication',
    description: 'Operation for employee create application',
    summary: 'employee create application',
  })
  createApplication(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationsEmployeeService.createApplication(
      createApplicationDto,
    );
  }

  @Get(':ownerId')
  @ApiOperation({
    operationId: 'employeeGetApplications',
    description: 'Operation for employee tp get applications',
    summary: 'employee get applications',
  })
  getApplication(@Param('ownerId') ownerId: string) {
    return this.applicationsEmployeeService.getApplications(ownerId);
  }
}
