import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JobPostService } from '../providers/job-post.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EmployeeSearchJobPostDto } from '../dto/job-post-filter.dto';
import { JobPostResponseDto } from '../dto/job-post-response.dto';
import { ERoleName } from 'src/shared/type';
import { Roles } from 'src/decorators/role.decorator';
import { RolesGuard } from 'src/guards/role.guard';

@ApiTags('employee.job-post')
@Controller('employee/job-post')
@UseGuards(RolesGuard)
@ApiBearerAuth()
export class JobPostEmployeeController {
  constructor(private readonly jobPostService: JobPostService) {}

  @Get(':postId')
  @Roles(ERoleName.EMPLOYEES)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: JobPostResponseDto,
  })
  @ApiOperation({
    operationId: 'employeeGetJobPostDetail',
    description: 'Operation for employee read job post detail',
    summary: 'employee read job post detail',
  })
  readPostDetail(@Param('postId') postId: string) {
    return this.jobPostService.readPostDetail(postId);
  }

  @Get('/search')
  @Roles(ERoleName.EMPLOYEES)
  @ApiOperation({
    operationId: 'employeeSearchJobPost',
    description: 'Operation for employee search job post',
    summary: 'employee search job post',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: [JobPostResponseDto],
  })
  findOne(@Query() searchData: EmployeeSearchJobPostDto) {
    return this.jobPostService.searchPost(searchData);
  }
}
