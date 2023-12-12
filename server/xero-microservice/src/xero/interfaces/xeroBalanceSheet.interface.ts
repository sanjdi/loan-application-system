import { XeroBalance } from './xeroBalance.interface';

interface Balance {
  readonly year: number;
  readonly month: number;
  readonly profitOrLoss: number;
  readonly assetsValue: number;
}

export interface XeroBalanceSheet {
  readonly sheet: Balance[];
}
