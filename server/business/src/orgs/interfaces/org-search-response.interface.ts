import { Org } from './org.interface';

export interface OrgSearchResponse {
  status: number;
  message: string;
  org: Org | null;
}