import { Controller, Get, Param } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AccountingProvidersService } from './accounting-providers.service';
import { AccountingProvider } from './interfaces/accounting-provider.interface';
import { MyobService } from './myob.service';
import { XeroService } from './xero.service';
import { X } from './interfaces/dto/x.dto';

@Controller('accounting-providers')
export class AccountingProvidersController {
  constructor(
    private readonly accountingProvidersService: AccountingProvidersService,
    private readonly xeroService: XeroService,
    private readonly myobService: MyobService,
  ) {}

  @MessagePattern('get_balance_sheet')
  async getBalanceSheet(params: X) {
    switch (params.provider) {
      case 'xero':
        return this.xeroService.getBalanceSheet(params.companyId);
      case 'myob':
        return this.myobService.getBalanceSheet(params.companyId);
      default:
        throw new Error('Invalid accounting provider');
    }
  }

  @MessagePattern('get_accounting_providers')
  findAll(): AccountingProvider[] {
    return this.accountingProvidersService.findAll();
  }
}
