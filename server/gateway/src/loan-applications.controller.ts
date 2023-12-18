import {
  Controller,
  Get,
  Post,
  Inject,
  Param,
  HttpStatus,
  HttpException,
  Body,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ServiceLoansSearchApplicationResponse } from './interfaces/application/service-loans-search-application-response.interface';
import { ServiceLoansSearchApplicationsResponse } from './interfaces/application/service-loans-search-applications-response.interface';
import { ServiceLoansInitApplicationResponse } from './interfaces/application/service-loans-init-application-response.interface';
import { CreateApplicationDto } from './interfaces/application/dto/create-application.dto';
import { InitApplicationResponseDto } from './interfaces/application/dto/init-application-response.dto';
import { CreateApplicationResponseDto } from './interfaces/application/dto/create-application-response.dto';

@Controller('loan-applications')
export class LoanApplicationsController {
  constructor(
    @Inject('LOANS_SERVICE') private readonly loansServiceClient: ClientProxy,
  ) {}

  @Get()
  async getLoanApplications() {
    const response: ServiceLoansSearchApplicationsResponse =
      await firstValueFrom(
        this.loansServiceClient.send('get_applications', {}),
      );

    return {
      message: response.message,
      data: {
        applications: response.applications,
      },
      errors: null,
    };
  }
  /* 
  @Get(':id')
  async getLoanApplicationById(@Param('id') id: string) {
    const response: ServiceLoansSearchApplicationResponse = await firstValueFrom(
        this.loansServiceClient.send('get_application_by_id', {}),
      );
  
      return {
        message: response.message,
        data: {
          application: response.application,
        },
        errors: null,
      };
    } */

  @Get('init')
  public async initLoanApplication(): Promise<InitApplicationResponseDto> {
    // const response: ServiceLoansInitApplicationResponse = await firstValueFrom(
    //   this.loansServiceClient.send('init_application', {}),
    // );

    // return {
    //   message: response.message,
    //   data: {
    //     companies: response.data.companies,
    //     accountingProviders: response.data.accountingProviders,
    //   },
    //   errors: null,
    // };

    return {
      message: null,
      data: {
        companies: [
          { id: '1', name: 'WaterGardenInc', owner: 'Jack' },
          { id: '2', name: 'RentACar', owner: 'Mark' },
        ],
        accountingProviders: [
          { id: 'xero', name: 'Xero' },
          { id: 'myob', name: 'MYOB' },
        ],
      },
      errors: null,
    };
  }

  @Post()
  public async createLoanApplication(
    @Body() userRequest: CreateApplicationDto,
  ): Promise<CreateApplicationResponseDto> {
    const createApplicationResponse = await firstValueFrom(
      this.loansServiceClient.send('create_application', userRequest),
    );
    if (createApplicationResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message: createApplicationResponse.message,
          data: null,
          errors: createApplicationResponse.errors,
        },
        createApplicationResponse.status,
      );
    }

    console.log(`createUserResponse .. = ${JSON.stringify(createApplicationResponse)}`);
    
    return {
      message: createApplicationResponse.message,
      data: {
        approval: createApplicationResponse.application.applicationApproval,
        preAssessment: createApplicationResponse.application.applicationPreAssessment,
      },
      errors: null,
    };
  }
}
