import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ApplicationDocument = HydratedDocument<Application>;

@Schema()
export class Application {
  @Prop()
  companyId: string;

  @Prop()
  loanAmount: number;

  @Prop({
    type: {
      preAssementStatus: String,
      score: Number,
      preAssementLoanAmount: Number,
      age: Number,
    },
  })
  applicationPreAssessment: {
    preAssementStatus: string;
    score: number;
    preAssementLoanAmount: number;
    age: number;
  };

  @Prop({
    type: {
      approvalStatus: String,
      approvalScore: Number,
    },
  })
  applicationApproval: {
    approvalStatus: string;
    approvalScore: number;
  };
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
