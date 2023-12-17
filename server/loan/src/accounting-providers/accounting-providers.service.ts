import { Injectable } from '@nestjs/common';
import { AccountingProvider } from './interfaces/accounting-provider.interface';

@Injectable()
export class AccountingProvidersService {
  private readonly data: AccountingProvider[] = [
    {
      name: 'Xero',
      id: 'xero',
    },
    {
      name: 'MYOB',
      id: 'myob',
    },
  ];

  findAll(): AccountingProvider[] {
    return this.data;
  }
}
