import { BalanceSheet } from './interfaces/balance-sheet.interface';

export interface AccountingService {
  getBalanceSheet(companyId: string): BalanceSheet;
}
