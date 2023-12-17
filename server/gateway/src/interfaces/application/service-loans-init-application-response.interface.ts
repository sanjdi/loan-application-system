import { AccountingProvider } from '../accounting-providers/accounting-provider.interface';
import { Business } from '../org/business.interface';

export interface ServiceLoansInitApplicationResponse {
  status: number;
  message: string;
  data: { companies: Business[], accountingProviders: AccountingProvider[] } | null;
  errors: { [key: string]: any } | null;
}
