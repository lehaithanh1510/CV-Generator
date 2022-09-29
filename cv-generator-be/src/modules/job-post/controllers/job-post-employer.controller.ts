import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { JobPostEmployerService } from '../providers/job-post-employer.service';
import { CreateJobPostDto } from '../dto/create-job-post.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateJobPostDto } from '../dto/update-job-post.dto';
import { JobPostResponseDto } from '../dto/job-post-response.dto';
import { ERoleName } from 'src/shared/type';
import { Roles } from 'src/decorators/role.decorator';
import { RolesGuard } from 'src/guards/role.guard';

@ApiTags('employer.job-post')
@Controller('employer/job-post')
@UseGuards(RolesGuard)
@Roles(ERoleName.EMPLOYERS)
@ApiBearerAuth()
export class JobPostEmployerController {
  constructor(
    private readonly jobPostEmployerService: JobPostEmployerService,
  ) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: JobPostResponseDto,
  })
  @ApiOperation({
    operationId: 'employerCreateJobPost',
    description: 'Operation for employer create job post',
    summary: 'employer create job post',
  })
  createJobPost(@Body() createJobPostDto: CreateJobPostDto) {
    return this.jobPostEmployerService.createJobPost(createJobPostDto);
  }

  @Put(':postId')
  @ApiResponse({
    status: HttpStatus.OK,
    type: JobPostResponseDto,
  })
  @ApiOperation({
    operationId: 'employerUpdateJobPost',
    description: 'Operation for employer update job post',
    summary: 'employer update job post',
  })
  updateJobPost(
    @Param('postId') postId: string,
    @Body() updateJobPostDto: UpdateJobPostDto,
  ) {
    return this.jobPostEmployerService.updateJobPost(postId, updateJobPostDto);
  }

  @Delete(':id')
  @ApiOperation({
    operationId: 'employerDeleteJobPost',
    description: 'Operation for employer delete job post',
    summary: 'employer delete job post',
  })
  deleteJobPost(@Param('id') id: string) {
    return this.jobPostEmployerService.deleteJobPost(id);
  }
}
