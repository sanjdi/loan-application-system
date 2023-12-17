import { Application } from './application.interface';

export interface ServiceLoansSearchApplicationsResponse {
  status: number;
  message: string;
  applications: Application[] | null;
}