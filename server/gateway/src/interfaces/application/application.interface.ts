import { Document } from 'mongoose';
import { ApplicationApproval } from './application-approval.interface';
import { ApplicationPreAssessment } from './application-preassement.interface';

export interface Application extends Document {
  readonly companyId: String;
  readonly loanAmount: number;
  approval: ApplicationApproval;
  preAssessment?: ApplicationPreAssessment;
}
