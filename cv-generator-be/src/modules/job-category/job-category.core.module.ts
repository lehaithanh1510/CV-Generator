import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ECollectionName } from 'src/shared/type';
import { JobCategoryDocument } from './job-category.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ECollectionName.JOB_CATEGORY,
        schema: JobCategoryDocument.schema,
      },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      {
        name: ECollectionName.JOB_CATEGORY,
        schema: JobCategoryDocument.schema,
      },
    ]),
  ],
})
export class JobCategoryCoreModule {}
