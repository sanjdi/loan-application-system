import { Application } from './application.interface';

export interface ApplicationsSearchResponse {
  status: number;
  message: string;
  applications: Application[] | null;
}