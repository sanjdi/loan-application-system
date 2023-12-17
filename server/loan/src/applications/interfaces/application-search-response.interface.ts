import { Application } from './application.interface';

export interface ApplicationSearchResponse {
  status: number;
  message: string;
  application: Application | null;
}