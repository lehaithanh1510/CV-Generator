import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { UtilModule } from '../utils/util.module';
import { AuthCoreModule } from './auth.core.module';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { AuthCommonService } from './provider/auth.common.service';
import { AuthService } from './provider/auth.service';
import { Auth0Service } from './provider/auth0.service';

@Module({
  imports: [AuthCoreModule, UtilModule],
  controllers: [AuthController, UserController],
  providers: [AuthService, Auth0Service, AuthCommonService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserController);
  }
}
