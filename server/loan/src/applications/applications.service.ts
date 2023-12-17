import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Application } from './interfaces/application.interface';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApplicationPreAssessment } from './interfaces/application-preassement.interface';
import { ApplicationApproval } from './interfaces/application-approval.interface';
import { CreateApplicationResponseDto } from './dto/create-application-response.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @Inject('APPLICATION_MODEL')
    private readonly applicationModel: Model<Application>
  ) {}

  async createApplication(
    createApplicationDto: CreateApplicationDto
  ): Promise<ApplicationApproval> {
    const companyId = createApplicationDto.companyId;

    // Perform pre-assement
    const applicationPreAssessment =
      await this.summariseApplication(createApplicationDto);

    // Pass to Desicion Engine to get approved loan amount
    const applicationApproval = this.approveLoan(
      createApplicationDto,
      applicationPreAssessment
    );

    // Create the loan application
    // const createdApplication = this.applicationModel.create(createApplicationDto);
    const createdApplication = new this.applicationModel(createApplicationDto);

    const createdLoanApplication = new this.applicationModel({
      ...createApplicationDto,
      applicationPreAssessment: applicationPreAssessment,
      applicationApproval: applicationApproval,
    });

    await createdLoanApplication.save();

    // Return the response DTO
    return applicationApproval;
  }

  private async summariseApplication({
    companyId,
    loanAmount,
    dateFounded,
  }: CreateApplicationDto): Promise<ApplicationPreAssessment> {
    //TODO
    // const business = await this.companyService.getCompanyById(companyId);
    // const business = this.companyService.getCompanyById(companyId);
    // console.log(`companyId=${companyId}  amount=${amount}  business=${JSON.stringify(business)}`)
    // const balanceSheet = await this.getBalanceSheet("XERO", business.name, 2020, 10);
    // console.log(`balanceSheet=${JSON.stringify(balanceSheet)}`)
    // const profitOrLoss = balanceSheet.sheet.reduce((acc, curr) => acc += curr.profitOrLoss, 0);
    // console.log(`profitOrLoss=${profitOrLoss}`)
    // const avgAssetsValue = balanceSheet.sheet.reduce((acc, curr) => acc += curr.assetsValue, 0) / 12;
    // console.log(`avgAssetsValue=${avgAssetsValue}`)
    // const preAssessment = this.getPreAssessment(profitOrLoss, avgAssetsValue, amount);
    // console.log(`preAssessment=${preAssessment}`)
    // const summary = {
    //   "name": business.name,
    //   "founded": business.founded,
    //   "profitOrLoss": profitOrLoss,
    //   "score": preAssessment
    // }

    const preAssessmentSummary: ApplicationPreAssessment = {
      preAssementStatus: 'completed',
      score: 60,
      preAssementLoanAmount: 200,
      reasons: null,
    };
    return preAssessmentSummary;
  }

  private approveLoan(
    createApplicationDto: CreateApplicationDto,
    preAssessmentSummary: ApplicationPreAssessment
  ): ApplicationApproval {
    return {
      approvalStatus: this.isFoundedDateOk(createApplicationDto.dateFounded)
        ? 'approved'
        : 'rejected',
      approvalScore: this.isFoundedDateOk(createApplicationDto.dateFounded)
        ? preAssessmentSummary.score
        : 0,
    };
  }

  private isFoundedDateOk(value: string): boolean {
/*     const today: Date = new Date();
    today.setHours(0, 0, 0, 0);
    const founded: Date = new Date(value);
    founded.setHours(0, 0, 0, 0);
    return today.getTime() - founded.getTime() >= 31556926000; */
    return true;
  }

  public async find(params: { name: string }): Promise<Application[]> {
    return this.applicationModel.find(params).exec();
  }

  async findAll(): Promise<Application[]> {
    return this.applicationModel.find().exec();
  }

  async findById(applicationId: string): Promise<Application> {
    return this.applicationModel.findOne({ _id: applicationId });
  }

  async update(
    updateApplicationDto: UpdateApplicationDto
  ): Promise<Application> {
    const applicationId = updateApplicationDto.id;
    delete updateApplicationDto.id;
    const updatedApplication = await this.applicationModel
      .findOneAndUpdate({ _id: applicationId }, updateApplicationDto)
      .exec();
    if (!updatedApplication) {
      throw new NotFoundException(
        `Business with ID ${applicationId} not found`
      );
    }
    return updatedApplication;
  }

  async delete(applicationId: string) {
    const updatedApplication = await this.applicationModel
      .findOneAndDelete({ _id: applicationId })
      .exec();
  }
}
