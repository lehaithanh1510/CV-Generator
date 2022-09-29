import { Prop, Schema } from '@nestjs/mongoose';
import { BaseDocument } from 'src/shared/mongoose/base.document';
import { DefaultSchemaOptions } from 'src/shared/mongoose/schema-options';
@Schema(DefaultSchemaOptions)
export class JobCategoryDocument extends BaseDocument {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  companyId: string;

  @Prop({ default: false })
  isDefault?: boolean;
}
