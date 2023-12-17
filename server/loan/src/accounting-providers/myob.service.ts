import { Injectable } from '@nestjs/common';
import { AccountingService } from './accounting.service';
import { BalanceSheet } from './interfaces/balance-sheet.interface';
import { Balance } from './interfaces/balance.interface';

@Injectable()
export class MyobService implements AccountingService {
  getBalanceSheet(companyId: string): BalanceSheet {
    console.log(`Returning balance sheet for company id ${companyId} from MYOB`);
    const balances: Balance[] = [];
    for (let i = 2023; i > 2022; i--) {
      for (let j = 12; j >= 1; j--) {
        balances.push({
          year: i,
          month: j,
          profitOrLoss: Math.floor(Math.random() * 600001) - 300000,
          assetsValue: Math.floor(Math.random() * 200001)
        })
      }
    }
    return { sheet: balances };
  }
}
