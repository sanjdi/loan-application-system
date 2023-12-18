import {
  Controller,
  HttpStatus,
} from '@nestjs/common';
import { ApplicationService } from './applications.service';
import { Application } from './interfaces/application.interface';
import { MessagePattern } from '@nestjs/microservices';
import { ApplicationSearchResponse } from './interfaces/application-search-response.interface';
import { ApplicationCreateResponse } from './interfaces/application-create-response.interface';
import { ApplicationUpdateResponse } from './interfaces/application-update-response.interface';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApplicationsSearchResponse } from './interfaces/applications-search-response.interface';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @MessagePattern('get_applications')
  public async findAll(): Promise<ApplicationsSearchResponse> {
    let result: ApplicationsSearchResponse;

    const data = await this.applicationService.findAll();
    if (data) {
      result = {
        status: HttpStatus.OK,
        message: 'get_applications_success',
        applications: data,
      };
    } else {
      result = {
        status: HttpStatus.NOT_FOUND,
        message: 'get_applications_failed',
        applications: null,
      };
    }

    return result;
  }

  @MessagePattern('get_application_by_id')
  public async getApplicationById(inputParams: {
    id: string;
  }): Promise<ApplicationSearchResponse> {
    let result: ApplicationSearchResponse;

    if (inputParams.id) {
      const data = await this.applicationService.findById(inputParams.id);
      if (data) {
        result = {
          status: HttpStatus.OK,
          message: 'get_application_by_id_success',
          application: data,
        };
      } else {
        result = {
          status: HttpStatus.NOT_FOUND,
          message: 'get_application_by_id_not_found',
          application: null,
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'get_application_by_id_bad_request',
        application: null,
      };
    }

    return result;
  }

  @MessagePattern('create_application')
  public async create(inputParams: CreateApplicationDto): Promise<ApplicationCreateResponse> {
    let result: ApplicationCreateResponse;

    if (inputParams) {
        try {
          const response = await this.applicationService.createApplication(inputParams);
          result = {
            status: HttpStatus.CREATED,
            message: 'application_create_success',
            application: response,
            errors: null,
          };
        } catch (e) {
          result = {
            status: HttpStatus.PRECONDITION_FAILED,
            message: 'application_create_precondition_failed',
            application: null,
            errors: e.errors,
          };
        }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'application_create_bad_request',
        application: null,
        errors: null,
      };
    }

    return result;
  }

  @MessagePattern('update_application')
  public async update(inputParams: UpdateApplicationDto): Promise<ApplicationUpdateResponse> {
    let result: ApplicationUpdateResponse;

    if (inputParams) {
      const applicationWithId = await this.applicationService.findById(inputParams.id);

      if (applicationWithId && applicationWithId.id.length > 0) {
        try {
          const updatedApplication = await this.applicationService.update(inputParams);
          result = {
            status: HttpStatus.OK,
            message: 'application_update_success',
            application: updatedApplication,
            errors: null,
          };
        } catch (e) {
          result = {
            status: HttpStatus.PRECONDITION_FAILED,
            message: 'application_update_precondition_failed',
            application: null,
            errors: e.errors,
          };
        }
      } else {
        result = {
          status: HttpStatus.CONFLICT,
          message: 'application_create_conflict',
          application: null,
          errors: {
            id: {
              message: `Application with id ${inputParams.id} does not exist`,
            },
          },
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'application_update_bad_request',
        application: null,
        errors: null,
      };
    }

    return result;
  }
  
  /* TODO
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.applicationService.delete(id);
  } */
}
