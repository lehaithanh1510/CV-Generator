import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JobCategoryEmployerService } from './providers/job-category-employer.service';
import { JobCategoryService } from './providers/job-category.service';
import { JobCategoryEmployeeController } from './controllers/job-category-employee.controller';
import { JobCategoryEmployerController } from './controllers/job-category-employer.controller';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { UtilModule } from '../utils/util.module';
import { JobCategoryCoreModule } from './job-category.core.module';

@Module({
  imports: [JobCategoryCoreModule, UtilModule],
  controllers: [JobCategoryEmployeeController, JobCategoryEmployerController],
  providers: [JobCategoryEmployerService, JobCategoryService],
})
export class JobCategoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(JobCategoryEmployeeController, JobCategoryEmployerController);
  }
}
