import { Injectable } from '@nestjs/common';
import { XeroBalance } from './interfaces/xeroBalance.interface';
import { XeroBalanceSheet } from './interfaces/xeroBalanceSheet.interface';

@Injectable()
export class XeroService {
  private readonly data: XeroBalance[] = [
    {
      year: 2020,
      month: 12,
      profitOrLoss: 250000,
      assetsValue: 1234,
      entityName: 'WaterGardenInc',
    },
    {
      year: 2020,
      month: 11,
      profitOrLoss: 1150,
      assetsValue: 5789,
      entityName: 'WaterGardenInc',
    },
    {
      year: 2020,
      month: 10,
      profitOrLoss: 2500,
      assetsValue: 22345,
      entityName: 'WaterGardenInc',
    },
    {
      year: 2020,
      month: 8,
      profitOrLoss: -187000,
      assetsValue: 223452,
      entityName: 'WaterGardenInc',
    },
  ];

  findAll(): XeroBalanceSheet {
    const result = [];
    this.data.forEach((element) => {
      result.push({
        year: element.year,
        month: element.month,
        profitOrLoss: element.profitOrLoss,
        assetsValue: element.assetsValue,
      });
    });
    return { sheet: result };
  }

  findOneByNameAndDate(
    name: string,
    fromYear: number,
    fromMonth: number,
  ): XeroBalanceSheet {
    console.log(`name=${name}  fromYear=${fromYear}  fromMonth=${fromMonth}`);
    const result = [];
    this.data
      .filter((element) => {
        if (element.entityName === name) {
          if (element.year == fromYear && element.month >= fromMonth) {
            return true;
          } else if (element.year > fromYear) {
            return true;
          }
        }
        return false;
      })
      .forEach((element) => {
        result.push({
          year: element.year,
          month: element.month,
          profitOrLoss: element.profitOrLoss,
          assetsValue: element.assetsValue,
        });
      });
    return { sheet: result };
  }
}
