import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { ResumesController } from './controller/resumes-employee.controller';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { UtilModule } from '../utils/util.module';
import { ResumeCoreModule } from './resumes.core.modules';

@Module({
  imports: [ResumeCoreModule, UtilModule],
  controllers: [ResumesController],
  providers: [ResumesService],
})
export class ResumesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ResumesController);
  }
}
