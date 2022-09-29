import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ECollectionName } from 'src/shared/type';
import { ApplicationsDocument } from '../application.model';
import { EApplicationStatus } from '../application.types';

@Injectable()
export class ApplicationsEmployerService {
  constructor(
    @InjectModel(ECollectionName.APPLICATIONS)
    private readonly applicationModel: Model<ApplicationsDocument>,
  ) {}
  async acceptApplication(id: string) {
    return this.applicationModel.updateOne(
      { _id: id },
      { status: EApplicationStatus.ACCEPTED },
    );
  }

  rejectApplication(id: string) {
    return this.applicationModel.updateOne(
      { _id: id },
      { status: EApplicationStatus.ACCEPTED },
    );
  }

  getApplicationForJob(jobId: string) {
    return this.applicationModel.find({
      jobId,
    });
  }
}
