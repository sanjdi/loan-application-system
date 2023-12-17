import { ApplicationApproval } from './application-approval.interface';

export interface ApplicationCreateResponse {
  status: number;
  message: string;
  applicationApproval: ApplicationApproval | null;
  errors: { [key: string]: any } | null;
}