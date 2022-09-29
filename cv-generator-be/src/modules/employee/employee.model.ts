import { Prop, Schema } from '@nestjs/mongoose';
import {
  BaseDocument,
  EmbeddedDocument,
} from 'src/shared/mongoose/base.document';
import { DefaultSchemaOptions } from 'src/shared/mongoose/schema-options';
@Schema({ _id: false })
export class SchoolDocument extends EmbeddedDocument {
  @Prop()
  startingDate?: string;

  @Prop()
  endingDate?: string;

  @Prop()
  degree?: string;

  @Prop()
  schoolName?: string;
}

@Schema({ _id: false })
export class EducationDocument extends EmbeddedDocument {
  @Prop()
  highSchool?: SchoolDocument;

  @Prop()
  university?: SchoolDocument;
}

@Schema({ _id: false })
export class WorkingExperienceDocument extends EmbeddedDocument {
  @Prop()
  position?: string;

  @Prop()
  companyName?: string;

  @Prop()
  responsibility?: string;

  @Prop()
  startingDate?: string;

  @Prop()
  endingDate?: string;
}
@Schema(DefaultSchemaOptions)
export class EmployeeDocument extends BaseDocument {
  @Prop({ require: true })
  userId: string;

  @Prop()
  email?: string;

  @Prop()
  name?: string;

  @Prop()
  avatar?: string;

  @Prop()
  gender?: string;

  @Prop()
  age?: number;

  @Prop()
  profession?: string;

  @Prop()
  location?: string;

  @Prop()
  mobilePhone?: string;

  @Prop()
  profileDescription?: string;

  @Prop()
  facebookLink?: string;

  @Prop()
  linkedInLink?: string;

  @Prop()
  gitHubLink?: string;

  @Prop()
  education?: EducationDocument;

  @Prop()
  workingExperience?: WorkingExperienceDocument[];

  @Prop()
  skills?: string;
}
