import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { LoansService } from './loans.service';
import { Loan } from './interfaces/loan.interface';
import { AccountingProvider } from './interfaces/accounting-provider.interface';
import { AccountingProvidersService } from 'src/accounting-providers/accounting-providers.service';

@Controller('loans')
export class LoansController {
  constructor(
    private readonly loansService: LoansService,
    private readonly accountingProvidersService: AccountingProvidersService,
  ) {}

  @Get('init-application')
  getInitialFormData(): any {
    const formData = {
      companies: [
        { id: '1', name: 'WaterGardenInc', founded: '01/03/2010' },
        { id: '2', name: 'ReantACar', founded: '01/10/2020' },
        { id: '3', name: 'BestCleaners', founded: '12/06/2023' },
      ],
      accountingProviders: [
        { id: 'XERO', name: 'Xero' },
        { id: 'MYOB', name: 'MYOB' },
      ],
    };
    return formData;
  }

  @Post('apply')
  async applyLoan(@Body() loan: CreateLoanDto): Promise<Loan> {
    console.log(`CreateLoanDto=${JSON.stringify(loan)}`);
    // Validate the loan application
    const validationResult = await this.validateLoanApplication(loan);
    if (!validationResult.valid) {
      throw new BadRequestException(validationResult.message);
    }

    // Loan application processing is delegated to the service
    const l = await this.loansService.createLoan(loan);
    console.log(`created loan=${JSON.stringify(l)}`);

    return l;
  }

  /*
   * Global ValidationPipe used in main.ts performs request value validation as per
   * validation rules (decorations) used in DTOs.
   * This is a placeholder for any additonal validations, if any.
   */
  private async validateLoanApplication(
    loan: CreateLoanDto,
  ): Promise<{ valid: boolean; message?: string }> {
    const errors = [];

    // Additional custom validation logic goes here.

    if (errors.length > 0) {
      const message = errors
        .map((error) => Object.values(error.constraints))
        .join(', ');
      return { valid: false, message };
    }

    return { valid: true };
  }

  @Get()
  async findAll(): Promise<Loan[]> {
    return this.loansService.findAll();
  }
}
