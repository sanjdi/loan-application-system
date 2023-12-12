import { Injectable } from '@nestjs/common';
import { AccountingProvider } from './interfaces/accounting-provider.interface';

@Injectable()
export class AccountingProvidersService {
  private readonly data: AccountingProvider[] = [
    {
      name: 'Xero',
      id: 'XERO',
    },
    {
      name: 'MYOB',
      id: 'MYOB',
    },
  ];

  findAll(): AccountingProvider[] {
    return this.data;
  }

  findOneByName(name: string): AccountingProvider {
    const result = [];
    return this.data.find((element) => element.name === name);
  }
}
