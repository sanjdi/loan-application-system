import { Application } from './application.interface';

export interface ApplicationUpdateResponse {
  status: number;
  message: string;
  application: Application | null;
  errors: { [key: string]: any } | null;
}