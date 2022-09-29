import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JobCategoryService } from '../providers/job-category.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EmployeeSearchJobCategoryDto } from '../dto/job-category-filter.dto';
import { JobCategoryResponseDto } from '../dto/job-category-response.dto';
import { ERoleName } from 'src/shared/type';
import { Roles } from 'src/decorators/role.decorator';
import { RolesGuard } from 'src/guards/role.guard';

@ApiTags('employee.job-category')
@Controller('employee/job-category')
@UseGuards(RolesGuard)
@ApiBearerAuth()
export class JobCategoryEmployeeController {
  constructor(private readonly jobCategoryService: JobCategoryService) {}

  @Get()
  @Roles(ERoleName.EMPLOYEES)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: JobCategoryResponseDto,
  })
  @ApiOperation({
    operationId: 'employerGetJobCategoryDetail',
    description: 'Operation for employee read job Category detail',
    summary: 'employee read job Category detail',
  })
  readCategoryDetail(@Param('CategoryId') CategoryId: string) {
    return this.jobCategoryService.readCategoryDetail(CategoryId);
  }

  @Get('/search')
  @Roles(ERoleName.EMPLOYEES)
  @ApiOperation({
    operationId: 'employeeSearchJobCategory',
    description: 'Operation for employee search job Category',
    summary: 'employee search job Category',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: [JobCategoryResponseDto],
  })
  findOne(@Query() searchData: EmployeeSearchJobCategoryDto) {
    return this.jobCategoryService.searchCategory(searchData);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateJobCategoryDto: UpdateJobCategoryDto) {
  //   return this.jobCategoryService.update(+id, updateJobCategoryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.jobCategoryService.remove(+id);
  // }
}
