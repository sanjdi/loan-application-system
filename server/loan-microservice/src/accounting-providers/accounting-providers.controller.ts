import { Controller, Get, Inject, Param } from '@nestjs/common';
import { AccountingProvidersService } from './accounting-providers.service';
import { AccountingProvider } from './interfaces/accounting-provider.interface';
import { BalanceSheet } from './interfaces/balanceSheet.interface';
import { ClientProxy } from '@nestjs/microservices';

@Controller('accounting-providers')
export class AccountingProvidersController {
  constructor(
    private readonly accountingProvidersService: AccountingProvidersService,
    @Inject('ACCOUNTING_PROVIDER_SERVICE') private client: ClientProxy,
  ) {}

  @Get()
  findAll(): AccountingProvider[] {
    return this.accountingProvidersService.findAll();
  }

  @Get(':name')
  findOneByName(@Param('name') name: string): AccountingProvider {
    return this.accountingProvidersService.findOneByName(name);
  }

  @Get(':accProviderId/:companyName/:fromYear/:fromMonth')
  getBalanceSheet(
    @Param('accProviderId') accProviderId: string,
    @Param('companyName') companyName: string,
    @Param('fromYear') fromYear: string,
    @Param('fromMonth') fromMonth: string,
  ) {
    // Create request payload and forward to the ClientProxy, and returns the results
    console.log(`accProviderId=${accProviderId}  companyName=${companyName}  fromYear=${fromYear}  fromMonth=${fromMonth}`)
    return this.client.send({ cmd: 'balances' }, {
      "accProviderId": accProviderId,
      "companyName": companyName,
      "fromYear": fromYear,
      "fromMonth": fromMonth
    });
  }

  /* @Get(':accProviderId/:companyName:/:fromYear:/:fromMonth')
  async getBalanceSheet2(
    @Param('accProviderId') accProviderId: string,
    @Param('companyNamev') companyName: string,
    @Param('fromYear') fromYear: string,
    @Param('fromMonth') fromMonth: string,
  ): Promise<BalanceSheet> {
    return await this.accountingProvidersService.getBalanceSheet(
      accProviderId,
      companyName,
      parseInt(fromYear),
      parseInt(fromMonth),
    );
  } */
}
