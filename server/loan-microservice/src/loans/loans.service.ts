import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Loan } from './interfaces/loan.interface';
import { CompanyService } from 'src/company/company.service';
import { Observable, catchError, firstValueFrom } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { BalanceSheet } from './interfaces/balanceSheet.interface';
import { HttpService } from '@nestjs/axios';
import { PreAssessmentSummary } from './interfaces/pre-assessment-summary.interface';

@Injectable()
export class LoansService {
  constructor(
    @Inject('LOAN_MODEL') private readonly loanModel: Model<Loan>,
    private readonly companyService: CompanyService,
    private readonly httpService: HttpService
  ) {}
  
  async createLoan(loan: CreateLoanDto): Promise<Loan> {
    const companyId = loan.company_id;
    
    // Perform pre-assement
    const preAssessment = await this.summariseApplication(companyId, loan.amount);

    // Pass to Desicion Engine to get approved loan amount
    const approvedAmount = this.approveLoan(preAssessment, loan.amount);

    // Update loan status based on approved loan amount
    loan.approvedAmount = approvedAmount;

    // Update loan status based on approved loan amount
    loan.status = approvedAmount > 0 ? 'approved' : 'rejected';

    // Update application date
    loan.dateApplied = this.formatDate(new Date(), "dd/mm/yyyy");

    const createdLoan = this.loanModel.create(loan);

    return createdLoan;
  }

  private async summariseApplication(companyId: string, amount: number): Promise<PreAssessmentSummary> {
    const business = await this.companyService.getCompanyById(companyId);
    console.log(`companyId=${companyId}  amount=${amount}  business=${JSON.stringify(business)}`)
    const balanceSheet = await this.getBalanceSheet("XERO", business.name, 2020, 10);
    console.log(`balanceSheet=${JSON.stringify(balanceSheet)}`)
    const profitOrLoss = balanceSheet.sheet.reduce((acc, curr) => acc += curr.profitOrLoss, 0);
    console.log(`profitOrLoss=${profitOrLoss}`)
    const avgAssetsValue = balanceSheet.sheet.reduce((acc, curr) => acc += curr.assetsValue, 0) / 12;
    console.log(`avgAssetsValue=${avgAssetsValue}`)
    const preAssessment = this.getPreAssessment(profitOrLoss, avgAssetsValue, amount);
    console.log(`preAssessment=${preAssessment}`)
    const summary = {
      "name": business.name,
      "founded": business.founded,
      "profitOrLoss": profitOrLoss,
      "score": preAssessment
    }
    return summary;
  }

  private async getBalanceSheet(
    accSystemId: string,
    companyName: string,
    fromYear: number,
    fromMonth: number,
  ): Promise<BalanceSheet> {
    console.log(`accSystemId=${accSystemId}  companyName=${companyName}  fromYear=${fromYear}  fromMonth=${fromMonth}`)

    const { data } = await firstValueFrom(
      this.httpService.get<BalanceSheet>(`${process.env.ACCOUNTING_PROVIDER_PROXY_URL}/accounting-providers/${accSystemId}/${companyName}/${fromYear}/${fromMonth}`).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
  
  private getPreAssessment(profitOrLoss: number, avgAssetsValue: number, amount: number): number {
    if (avgAssetsValue > amount) return 100;
    if (profitOrLoss > 0) return 60;
    return 20;
  }

  private approveLoan(preAssessment: PreAssessmentSummary, amount: number): number {
    if (this.isFoundedDateOk(preAssessment.founded)) {
      return preAssessment.score * amount / 100;
    }

    return 0;
  }

  async findAll(): Promise<Loan[]> {
    return this.loanModel.find().exec();
  }

  private isFoundedDateOk(value: string): boolean {
    const today: Date = new Date(); today.setHours(0, 0, 0, 0);
    const founded: Date = new Date(value); founded.setHours(0, 0, 0, 0);
    return today.getTime() - founded.getTime() >= 31556926000;
  }

  private formatDate(date: Date, format: string) {
    const map = {
        mm: date.getMonth() + 1,
        dd: date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
        yy: date.getFullYear().toString().slice(-2),
        yyyy: date.getFullYear()
    }
  
    return format.replace(/mm|dd|yy|yyyy/gi, matched => map[matched])
  }
}
