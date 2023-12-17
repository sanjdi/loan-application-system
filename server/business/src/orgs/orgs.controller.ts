import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Patch,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { CreateOrgDto } from './dto/create-org.dto';
import { OrgService } from './orgs.service';
import { Org } from './interfaces/org.interface';
import { UpdateOrgDto } from './dto/update-org.dto';
import { MessagePattern } from '@nestjs/microservices';
import { OrgSearchResponse } from './interfaces/org-search-response.interface';
import { OrgCreateResponse } from './interfaces/org-create-response.interface';
import { OrgsSearchResponse } from './interfaces/orgs-search-response.interface';

@Controller('org')
export class OrgController {
  constructor(private readonly orgService: OrgService) {}

  @MessagePattern('get_orgs')
  public async findAll(): Promise<OrgsSearchResponse> {
    let result: OrgsSearchResponse;
    console.log(`Org service >> findAll()`)
    const data = await this.orgService.findAll();
    console.log(`Org service >> data from db=${JSON.stringify(data)}`)
    if (data) {
      result = {
        status: HttpStatus.OK,
        message: 'get_orgs_success',
        orgs: data,
      };
    } else {
      result = {
        status: HttpStatus.NOT_FOUND,
        message: 'get_orgs_failed',
        orgs: null,
      };
    }

    console.log(`Org service >> result=${JSON.stringify(result)}`)

    return result;
  }

  @MessagePattern('get_org_by_id')
  public async getOrgById(inputParams: {
    id: string;
  }): Promise<OrgSearchResponse> {
    let result: OrgSearchResponse;

    if (inputParams.id) {
      const data = await this.orgService.findById(inputParams.id);
      if (data) {
        result = {
          status: HttpStatus.OK,
          message: 'get_org_by_id_success',
          org: data,
        };
      } else {
        result = {
          status: HttpStatus.NOT_FOUND,
          message: 'get_org_by_id_not_found',
          org: null,
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'get_org_by_id_bad_request',
        org: null,
      };
    }

    return result;
  }

  @MessagePattern('create_org')
  public async create(inputParams: Org): Promise<OrgCreateResponse> {
    let result: OrgCreateResponse;

    if (inputParams) {
      const orgWithName = await this.orgService.find({
        name: inputParams.name,
      });

      if (orgWithName && orgWithName.length > 0) {
        result = {
          status: HttpStatus.CONFLICT,
          message: 'org_create_conflict',
          org: null,
          errors: {
            name: {
              message: `Business with name ${inputParams.name} already exists`,
              path: 'name',
            },
          },
        };
      } else {
        try {
          const createdOrg = await this.orgService.createOrg(inputParams);
          result = {
            status: HttpStatus.CREATED,
            message: 'org_create_success',
            org: createdOrg,
            errors: null,
          };
        } catch (e) {
          result = {
            status: HttpStatus.PRECONDITION_FAILED,
            message: 'org_create_precondition_failed',
            org: null,
            errors: e.errors,
          };
        }
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'org_create_bad_request',
        org: null,
        errors: null,
      };
    }

    return result;
  }

  @MessagePattern('update_org')
  public async update(inputParams: Org): Promise<OrgCreateResponse> {
    let result: OrgCreateResponse;

    if (inputParams) {
      const orgWithId = await this.orgService.findById(inputParams.id);

      if (orgWithId && orgWithId.id.length > 0) {
        try {
          const updatedOrg = await this.orgService.update(inputParams);
          result = {
            status: HttpStatus.OK,
            message: 'org_update_success',
            org: updatedOrg,
            errors: null,
          };
        } catch (e) {
          result = {
            status: HttpStatus.PRECONDITION_FAILED,
            message: 'org_update_precondition_failed',
            org: null,
            errors: e.errors,
          };
        }
      } else {
        result = {
          status: HttpStatus.CONFLICT,
          message: 'org_create_conflict',
          org: null,
          errors: {
            id: {
              message: `Business with id ${inputParams.id} does not exist`,
            },
          },
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'org_update_bad_request',
        org: null,
        errors: null,
      };
    }

    return result;
  }

  // @MessagePattern({ cmd: 'get_companies' })
  /*
  @Get()
  async findAll(): Promise<Org[]> {
    return this.orgService.findAll();
  }
 
  @Get(':orgId')
  async getOrgById(
    @Param('orgId') orgId: string,
  ): Promise<Org> {
    const org = await this.orgService.getOrgById(orgId);
    if (!org) {
      throw new NotFoundException(`Org with ID ${orgId} not found`);
    }
    return org;
  }
  
  @Post()
  async create(@Body() createOrgDto: CreateOrgDto) {
    return this.orgService.createOrg(createOrgDto);
  }
  
  @Get(':orgId')
  getOrgById(
    @Param('orgId') orgId: string,
  ): Org {
    const org = this.orgService.getOrgById(orgId);
    if (!org) {
      throw new NotFoundException(`Org with ID ${orgId} not found`);
    }
    return org;
  } /*

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateOrgDto) {
    return this.orgService.update(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.orgService.delete(id);
  } */
}
