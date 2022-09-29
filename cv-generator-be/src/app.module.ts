import { config } from 'dotenv';
config();
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './modules/employee/employee.module';
import { EmployerModule } from './modules/employer/employer.module';
import { JobPostModule } from './modules/job-post/job-post.module';
import { ResumesModule } from './modules/resumes/resumes.module';
import { ApplicationsModule } from './modules/applications/applications.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JobCategoryModule } from './modules/job-category/job-category.module';
import { AuthModule } from './modules/auth/auth.module';
import { UtilModule } from './modules/utils/util.module';
@Module({
  imports: [
    EmployeeModule,
    EmployerModule,
    JobPostModule,
    ResumesModule,
    ApplicationsModule,
    JobCategoryModule,
    AuthModule,
    MongooseModule.forRoot(process.env.MONGODB_DATABASE_URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
