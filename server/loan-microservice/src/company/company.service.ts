import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './interfaces/company.interface';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('COMPANY_MODEL') private readonly companyModel: Model<Company>,
  ) {}

  async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const createdCompany = this.companyModel.create(createCompanyDto);
    return createdCompany;
  }

  async findAll(): Promise<Company[]> {
    return this.companyModel.find().exec();
  }

  async getCompanyById(companyId: string): Promise<Company> {
    const company = await this.companyModel.findById(companyId).exec();
    if (!company) {
      throw new NotFoundException(`Business with ID ${companyId} not found`);
    }
    return company;
  }

  async update(companyId: string, updateUserDto: UpdateCompanyDto) {
    const updatedCompany = await this.companyModel.findOneAndUpdate({ "_id": companyId }, updateUserDto).exec();
    if (!updatedCompany) {
      throw new NotFoundException(`Business with ID ${companyId} not found`);
    }
    return updatedCompany;
  }

  async delete(companyId: string) {
    const updatedCompany = await this.companyModel.findOneAndDelete({ "_id": companyId }).exec();
  }
}
