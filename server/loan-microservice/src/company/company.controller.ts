import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyService } from './company.service';
import { Company } from './interfaces/company.interface';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.createCompany(createCompanyDto);
  }

  @Get()
  async findAll(): Promise<Company[]> {
    return this.companyService.findAll();
  }

  @Get(':companyId')
  async getCompanyById(
    @Param('companyId') companyId: string,
  ): Promise<Company> {
    const company = await this.companyService.getCompanyById(companyId);
    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }
    return company;
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.companyService.delete(id);
  }
}
