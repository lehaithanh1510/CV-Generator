import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EmployeeCrudService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { UtilModule } from '../utils/util.module';
import { EmployeeCoreModule } from './employee.core.module';
import { ResumeCoreModule } from '../resumes/resumes.core.modules';

@Module({
  imports: [EmployeeCoreModule, UtilModule, ResumeCoreModule],
  controllers: [EmployeeController],
  providers: [EmployeeCrudService],
})
export class EmployeeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(EmployeeController);
  }
}
