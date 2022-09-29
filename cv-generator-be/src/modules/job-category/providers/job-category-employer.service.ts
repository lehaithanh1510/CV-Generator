import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ECollectionName } from 'src/shared/type';
import { CreateJobCategoryDto } from '../dto/create-job-category.dto';
import { UpdateJobCategoryDto } from '../dto/update-job-category.dto';
import { JobCategoryDocument } from '../job-category.model';

@Injectable()
export class JobCategoryEmployerService {
  constructor(
    @InjectModel(ECollectionName.JOB_CATEGORY)
    private readonly jobCategoryModel: Model<JobCategoryDocument>,
  ) {}

  async createJobCategory(createJobCategoryDto: CreateJobCategoryDto) {
    const jobCategory = await new this.jobCategoryModel(createJobCategoryDto);

    return jobCategory.save();
  }

  updateJobCategory(
    jobCategoryId: string,
    updateJobCategoryDto: UpdateJobCategoryDto,
  ) {
    return this.jobCategoryModel.findOneAndUpdate(
      { _id: jobCategoryId },
      updateJobCategoryDto,
      { new: true },
    );
  }

  deleteJobCategory(id: string) {
    return this.jobCategoryModel.deleteOne({ _id: id });
  }
}
