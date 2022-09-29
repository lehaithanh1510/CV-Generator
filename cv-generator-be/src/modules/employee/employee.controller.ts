import {
  Controller,
  Get,
  Body,
  Patch,
  Query,
  UseGuards,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';
import { EmployeeCrudService } from './employee.service';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FilterEmployeeDto } from './dto/filter-employee.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { ERoleName } from 'src/shared/type';
import { User } from 'src/decorators/user.decorator';
import { IUserData } from '../user/user.type';
import { InjectResumesToEmployeeInterceptor } from 'src/interceptors/employee/inject-resume-data-to-employee.interceptor';
import { EmployeeResponseDto } from './dto/employee.response.dto';

@Controller('employee-information')
@ApiTags('employee.information')
@ApiBearerAuth()
@UseGuards(RolesGuard)
export class EmployeeController {
  constructor(private readonly employeeCrudService: EmployeeCrudService) {}

  @Roles(ERoleName.EMPLOYEES)
  @Get()
  @ApiOperation({
    operationId: 'employeeGetInformation',
    description: 'Operation for employee get information',
    summary: 'employee get information',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: EmployeeResponseDto,
  })
  @UseInterceptors(InjectResumesToEmployeeInterceptor)
  getEmployee(@User() user: IUserData) {
    return this.employeeCrudService.getEmployee(user);
  }

  @Roles(ERoleName.EMPLOYEES)
  @Patch()
  @ApiResponse({
    status: HttpStatus.OK,
    type: EmployeeResponseDto,
  })
  @ApiOperation({
    operationId: 'employeeUpdateInformation',
    description: 'Operation for employee update information',
    summary: 'employee update information',
  })
  update(
    @User() user: IUserData,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeCrudService.updateEmployeeInfo(
      user.userId,
      updateEmployeeDto,
    );
  }
}
