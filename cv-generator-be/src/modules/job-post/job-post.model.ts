import { Prop, Schema } from '@nestjs/mongoose';
import { BaseDocument } from 'src/shared/mongoose/base.document';
import { DefaultSchemaOptions } from 'src/shared/mongoose/schema-options';
@Schema(DefaultSchemaOptions)
export class JobPostDocument extends BaseDocument {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: Boolean })
  active: boolean;

  @Prop({ required: true, type: String })
  companyId: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: String })
  requirement: string;

  @Prop({ type: [String] })
  keywords?: string[];

  @Prop({ type: [String] })
  locations?: string[];

  @Prop({ type: [String] })
  categoryIds?: string[];
}
