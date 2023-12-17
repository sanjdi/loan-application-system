import { Controller, Get, Inject, Param } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ServiceBusinessesSearchOrgResponse } from './interfaces/org/service-business-search-org-response.interface';
import { ClientProxy } from '@nestjs/microservices';
import { ServiceBusinessesSearchOrgsResponse } from './interfaces/org/service-business-search-orgs-response.interface';

@Controller('orgs')
export class BusinessController {
  constructor(
    @Inject('BUSINESS_SERVICE') private readonly businessServiceClient: ClientProxy,
  ) {}

  @Get()
  async getOrgs() {
    console.log(`gateway >> getOrgs()`)
    const response: ServiceBusinessesSearchOrgsResponse = await firstValueFrom(
      this.businessServiceClient.send('get_orgs', {}),
    );

    console.log(`gateway >> getOrgs() | response=${JSON.stringify(response)}`)

    return {
      message: response.message,
      data: {
        businesses: response.orgs,
      },
      errors: null,
    };
  }

  @Get(':id')
  async getOrgById(data: any) {
    const response: ServiceBusinessesSearchOrgResponse = await firstValueFrom(
        this.businessServiceClient.send('get_org_by_id', data),
      );
  
      return {
        message: response.message,
        data: {
          business: response.org,
        },
        errors: null,
      };
    }
}