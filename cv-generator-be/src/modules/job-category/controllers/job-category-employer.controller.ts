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
import { JobCategoryEmployerService } from '../providers/job-category-employer.service';
import { CreateJobCategoryDto } from '../dto/create-job-category.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateJobCategoryDto } from '../dto/update-job-category.dto';
import { JobCategoryResponseDto } from '../dto/job-category-response.dto';
import { ERoleName } from 'src/shared/type';
import { Roles } from 'src/decorators/role.decorator';
import { RolesGuard } from 'src/guards/role.guard';

@ApiTags('employer.job-category')
@Controller('employer/job-category')
@UseGuards(RolesGuard)
@ApiBearerAuth()
export class JobCategoryEmployerController {
  constructor(
    private readonly jobCategoryEmployerService: JobCategoryEmployerService,
  ) {}

  @Post()
  @Roles(ERoleName.EMPLOYERS)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: JobCategoryResponseDto,
  })
  @ApiOperation({
    operationId: 'employerCreateJobCategory',
    description: 'Operation for employer create job category',
    summary: 'employer create job category',
  })
  createJobCategory(@Body() createJobCategoryDto: CreateJobCategoryDto) {
    return this.jobCategoryEmployerService.createJobCategory(
      createJobCategoryDto,
    );
  }

  @Put(':CategoryId')
  @Roles(ERoleName.EMPLOYERS)
  @ApiResponse({
    status: HttpStatus.OK,
    type: JobCategoryResponseDto,
  })
  @ApiOperation({
    operationId: 'employerUpdateJobCategory',
    description: 'Operation for employer update job category',
    summary: 'employer update job category',
  })
  updateJobCategory(
    @Param('CategoryId') CategoryId: string,
    @Body() updateJobCategoryDto: UpdateJobCategoryDto,
  ) {
    return this.jobCategoryEmployerService.updateJobCategory(
      CategoryId,
      updateJobCategoryDto,
    );
  }

  @Delete(':id')
  @ApiOperation({
    operationId: 'employerDeleteJobCategory',
    description: 'Operation for employer delete job category',
    summary: 'employer delete job category',
  })
  deleteJobCategory(@Param('id') id: string) {
    return this.jobCategoryEmployerService.deleteJobCategory(id);
  }
}
