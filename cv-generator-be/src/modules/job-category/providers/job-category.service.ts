import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ECollectionName } from 'src/shared/type';
import { EmployeeSearchJobCategoryDto } from '../dto/job-category-filter.dto';
import { JobCategoryDocument } from '../job-category.model';

@Injectable()
export class JobCategoryService {
  constructor(
    @InjectModel(ECollectionName.JOB_CATEGORY)
    private readonly jobCategoryModel: Model<JobCategoryDocument>,
  ) {}

  async readCategoryDetail(categoryId) {
    const post = await this.jobCategoryModel.findById(categoryId);

    if (!post) {
      throw new NotFoundException({ message: 'Post is not found' });
    }
    return post;
  }

  async searchCategory(searchData: EmployeeSearchJobCategoryDto) {
    const { companyId, searchText } = searchData;
    const categorySearchQuery = {} as any;

    if (companyId) {
      categorySearchQuery.companyId = companyId;
    }

    if (searchText) {
      categorySearchQuery.name = {
        $elemMatch: { $regex: searchText, $options: 'i' },
      };
    }

    return this.jobCategoryModel.find(categorySearchQuery);
  }
}
