import { AccountingProvider } from "./accounting-provider.interface";

export interface ServiceAccountingProvidersSearchResponse {
  status: number;
  message: string;
  accountingProviders: AccountingProvider[] | null;
}