import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JobPostEmployerController } from './controllers/job-post-employer.controller';
import { JobPostEmployerService } from './providers/job-post-employer.service';
import { JobPostService } from './providers/job-post.service';
import { UtilModule } from '../utils/util.module';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { JobPostCoreModule } from './job-post.core.module';

@Module({
  imports: [JobPostCoreModule, UtilModule],
  controllers: [JobPostEmployerController, JobPostEmployerController],
  providers: [JobPostEmployerService, JobPostService],
})
export class JobPostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(JobPostEmployerController, JobPostEmployerController);
  }
}
