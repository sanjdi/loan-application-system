import { ApplicationApproval } from './application-approval.interface';

export interface ServiceLoansCreateApplicationResponse {
  status: number;
  message: string;
  data: { approval: ApplicationApproval } | null;
  errors: { [key: string]: any } | null;
}
