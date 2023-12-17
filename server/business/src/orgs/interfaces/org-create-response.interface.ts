import { Org } from './org.interface';

export interface OrgCreateResponse {
  status: number;
  message: string;
  org: Org | null;
  errors: { [key: string]: any } | null;
}