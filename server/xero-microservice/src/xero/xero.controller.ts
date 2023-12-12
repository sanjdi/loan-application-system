import { Controller, Get, Param } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { XeroService } from './xero.service';
import { XeroBalanceSheet } from './interfaces/xeroBalanceSheet.interface';
import { Params } from './interfaces/params.interface';

@Controller('xero')
export class XeroController {
  constructor(private readonly xeroService: XeroService) {}

  /* @Get()
  findAll(): XeroBalanceSheet {
    return this.xeroService.findAll();
  } */ 
  
  @Get(':name/:fromYear/:fromMonth')
  findOneByNameAndDate(
    @Param('name') name: string,
    @Param('fromYear') fromYear: string,
    @Param('fromMonth') fromMonth: string,
  ): XeroBalanceSheet {
     return this.xeroService.findOneByNameAndDate(
      name,
      parseInt(fromYear),
      parseInt(fromMonth),
    );
  }

  @MessagePattern({ cmd: 'balances' })
  getBalanceSheet(params: Params): XeroBalanceSheet {
    console.log(`params=${JSON.stringify(params)}`)
     return this.xeroService.findOneByNameAndDate(
      params.companyName,
      parseInt(params.fromYear),
      parseInt(params.fromMonth),
    );
  }
}
