import { Business } from './business.interface';

export interface ServiceBusinessesSearchOrgsResponse {
  status: number;
  message: string;
  orgs: Business[] | null;
}