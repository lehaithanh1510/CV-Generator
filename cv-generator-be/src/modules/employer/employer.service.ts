import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ECollectionName } from 'src/shared/type';
import { EmployeeDocument } from '../employee/employee.model';
import { IUserData } from '../user/user.type';
import { UpdateEmployerDto } from './dto/update-employer.dto';

@Injectable()
export class EmployerService {
  constructor(
    @InjectModel(ECollectionName.EMPLOYERS)
    private readonly employerModel: Model<EmployeeDocument>,
  ) {}

  async getEmployer(user: IUserData) {
    const employer = await this.employerModel.findOne({ userId: user.userId });

    if (!employer) {
      throw new NotFoundException('Employer not found');
    }

    return employer;
  }

  updateEmployerInfo(employerId: string, updateEmployerDto: UpdateEmployerDto) {
    return this.employerModel.findOneAndUpdate(
      { _id: employerId },
      updateEmployerDto,
      { new: true },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} employer`;
  }
}
