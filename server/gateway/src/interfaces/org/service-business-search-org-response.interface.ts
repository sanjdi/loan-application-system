import { Business } from './business.interface';

export interface ServiceBusinessesSearchOrgResponse {
  status: number;
  message: string;
  org: Business | null;
}