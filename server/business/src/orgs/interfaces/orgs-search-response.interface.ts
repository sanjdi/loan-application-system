import { Org } from './org.interface';

export interface OrgsSearchResponse {
  status: number;
  message: string;
  orgs: Org[] | null;
}