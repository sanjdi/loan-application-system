import { BalanceSheet } from "./balance-sheet.interface";

export interface ServiceAccountingProvidersGetBalanceSheetResponse {
  status: number;
  message: string;
  sheet: BalanceSheet[] | null;
}