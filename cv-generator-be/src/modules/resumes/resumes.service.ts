import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ECollectionName } from 'src/shared/type';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ResumeDocument } from './resume.model';

@Injectable()
export class ResumesService {
  constructor(
    @InjectModel(ECollectionName.RESUMES)
    private readonly resumeModel: Model<ResumeDocument>,
  ) {}
  async createResume(data: CreateResumeDto) {
    return this.resumeModel.create(data);
  }

  // findAll() {
  //   return `This action returns all resumes`;
  // }

  // readResume(id: number) {
  //   return `This action returns a #${id} resume`;
  // }

  updateEmployeeResume(resumeId: string, updateResumeDto: UpdateResumeDto) {
    return this.resumeModel.findOneAndUpdate(
      { _id: resumeId },
      updateResumeDto,
      { new: true },
    );
  }

  deleteResume(resumeId: string) {
    return this.resumeModel.deleteOne({ _id: resumeId });
  }
}
