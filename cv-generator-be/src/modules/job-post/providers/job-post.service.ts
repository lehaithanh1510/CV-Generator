import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ECollectionName } from 'src/shared/type';
import { EmployeeSearchJobPostDto } from '../dto/job-post-filter.dto';
import { JobPostDocument } from '../job-post.model';

@Injectable()
export class JobPostService {
  constructor(
    @InjectModel(ECollectionName.JOB_POST)
    private readonly jobPostModel: Model<JobPostDocument>,
  ) {}

  async readPostDetail(postId) {
    const post = await this.jobPostModel.findById(postId);

    if (!post) {
      throw new NotFoundException({ message: 'Job is not found' });
    }
    return post;
  }

  async searchPost(searchData: EmployeeSearchJobPostDto) {
    const { maxSalary, minSalary, location, keyword } = searchData;
    const postSearchQuery = {} as any;
    if (maxSalary) {
      postSearchQuery.salary = { $lte: maxSalary };
    }
    if (minSalary) {
      postSearchQuery.salary = { ...postSearchQuery.salary, $lte: maxSalary };
    }
    if (location) {
      postSearchQuery.location = location;
    }
    if (keyword) {
      postSearchQuery.keywords = {
        $elemMatch: { $regex: keyword, $options: 'i' },
      };
    }

    return this.jobPostModel.find(postSearchQuery);
  }
}
