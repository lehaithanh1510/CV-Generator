import { Module } from '@nestjs/common';
import { AuthCoreModule } from '../auth/auth.core.module';
import { EmployeeCoreModule } from '../employee/employee.core.module';
import { EmployerCoreModule } from '../employer/employer.core.module';
import { AuthUserUtil } from './auth-user.utils';

@Module({
  imports: [AuthCoreModule, EmployeeCoreModule, EmployerCoreModule],
  providers: [AuthUserUtil],
  exports: [AuthUserUtil],
})
export class UtilModule {}
