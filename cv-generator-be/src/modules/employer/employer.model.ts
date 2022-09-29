import { Prop, Schema } from '@nestjs/mongoose';
import { BaseDocument } from 'src/shared/mongoose/base.document';
import { DefaultSchemaOptions } from 'src/shared/mongoose/schema-options';
@Schema(DefaultSchemaOptions)
export class EmployerDocument extends BaseDocument {
  @Prop({ required: true, type: String, unique: true })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop()
  companyName?: string;

  @Prop()
  description?: string;

  @Prop({ required: true, type: String })
  userId: string;

  @Prop()
  logo?: string;

  @Prop({ type: [String] })
  locations?: string[];
}
