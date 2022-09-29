import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ECollectionName } from 'src/shared/type';
import { CreateJobPostDto } from '../dto/create-job-post.dto';
import { UpdateJobPostDto } from '../dto/update-job-post.dto';
import { JobPostDocument } from '../job-post.model';

@Injectable()
export class JobPostEmployerService {
  constructor(
    @InjectModel(ECollectionName.JOB_POST)
    private readonly jobPostModel: Model<JobPostDocument>,
  ) {}

  async createJobPost(createJobPostDto: CreateJobPostDto) {
    const jobPost = await new this.jobPostModel(createJobPostDto);

    return jobPost.save();
  }

  updateJobPost(jobPostId: string, updateJobPostDto: UpdateJobPostDto) {
    return this.jobPostModel.findOneAndUpdate(
      { _id: jobPostId },
      updateJobPostDto,
      { new: true },
    );
  }

  deleteJobPost(id: string) {
    return this.jobPostModel.deleteOne({ _id: id });
  }
}
