import { Application } from './application.interface';

export interface ApplicationCreateResponse {
  status: number;
  message: string;
  application: Application | null;
  errors: { [key: string]: any } | null;
}