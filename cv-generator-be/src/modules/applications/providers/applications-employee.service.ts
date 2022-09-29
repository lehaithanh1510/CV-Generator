import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ECollectionName } from 'src/shared/type';
import { ApplicationsDocument } from '../application.model';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { EApplicationStatus } from '../application.types';

@Injectable()
export class ApplicationsEmployeeService {
  constructor(
    @InjectModel(ECollectionName.APPLICATIONS)
    private readonly applicationModel: Model<ApplicationsDocument>,
  ) {}
  async createApplication(data: CreateApplicationDto) {
    return this.applicationModel.create({
      ...data,
      employeeId: data.ownerId,
      status: EApplicationStatus.PENDING,
    });
  }

  async getApplications(ownerId: string) {
    return this.applicationModel.find({ employeeId: ownerId });
  }
}
