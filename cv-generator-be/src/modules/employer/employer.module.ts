import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { EmployerController } from './employer.controller';
import { EmployerCoreModule } from './employer.core.module';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { UtilModule } from '../utils/util.module';

@Module({
  imports: [EmployerCoreModule, UtilModule],
  controllers: [EmployerController],
  providers: [EmployerService],
})
export class EmployerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(EmployerController);
  }
}
