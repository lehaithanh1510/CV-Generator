import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApplicationsEmployerService } from './providers/applications-employer.service';
import { EmployerApplicationsController } from './controllers/applications-employer.controller';
import { ApplicationsEmployeeController } from './controllers/applications-employee.controller';
import { ApplicationsEmployeeService } from './providers/applications-employee.service';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { UtilModule } from '../utils/util.module';
import { ApplicationCoreModule } from './applications.core.module';

@Module({
  imports: [ApplicationCoreModule, UtilModule],
  controllers: [EmployerApplicationsController, ApplicationsEmployeeController],
  providers: [ApplicationsEmployerService, ApplicationsEmployeeService],
})
export class ApplicationsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        EmployerApplicationsController,
        ApplicationsEmployeeController,
      );
  }
}
