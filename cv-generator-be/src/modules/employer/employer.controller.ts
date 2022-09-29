import { Controller, Get, Body, Patch, Query, UseGuards } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilterEmployerDto } from './dto/filter-employer.dto';
import { User } from 'src/decorators/user.decorator';
import { IUserData } from '../user/user.type';
import { Roles } from 'src/decorators/role.decorator';
import { ERoleName } from 'src/shared/type';
import { RolesGuard } from 'src/guards/role.guard';

@Controller('employer-information')
@ApiTags('employer.info')
@ApiBearerAuth()
@UseGuards(RolesGuard)
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}

  @Roles(ERoleName.EMPLOYERS)
  @Get()
  @ApiOperation({
    operationId: 'employerGetInformation',
    description: 'Operation for employer get information',
    summary: 'employer get information',
  })
  findOne(@User() user: IUserData, @Query() data: FilterEmployerDto) {
    return this.employerService.getEmployer(user);
  }

  @Roles(ERoleName.EMPLOYERS)
  @Patch()
  @ApiOperation({
    operationId: 'employerUpdateInformation',
    description: 'Operation for employer update information',
    summary: 'employer update information',
  })
  update(
    @Query() data: FilterEmployerDto,
    @Body() updateEmployerDto: UpdateEmployerDto,
  ) {
    return this.employerService.updateEmployerInfo(
      data.employerId,
      updateEmployerDto,
    );
  }
}
