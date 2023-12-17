import { AccountingProvider } from './accounting-provider.interface';

export interface AccountingProvidersSearchResponse {
  status: number;
  message: string;
  accountingproviders: AccountingProvider[] | null;
}