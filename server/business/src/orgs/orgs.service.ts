import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateOrgDto } from './dto/create-org.dto';
import { Org } from './interfaces/org.interface';
import { UpdateOrgDto } from './dto/update-org.dto';

@Injectable()
export class OrgService {
  constructor(@Inject('ORG_MODEL') private readonly orgModel: Model<Org>) {}

  async createOrg(createOrgDto: CreateOrgDto): Promise<Org> {
    const createdOrg = this.orgModel.create(createOrgDto);
    return createdOrg;
  }

  public async find(params: { name: string }): Promise<Org[]> {
    return this.orgModel.find(params).exec();
  }

  async findAll(): Promise<Org[]> {
    return this.orgModel.find().exec();
  }

  async findById(orgId: string): Promise<Org> {
    return this.orgModel.findOne({ _id: orgId });
  }

  async update(updateOrgDto: UpdateOrgDto): Promise<Org> {
    const orgId = updateOrgDto.id;
    delete updateOrgDto.id;
    const updatedOrg = await this.orgModel
      .findOneAndUpdate({ _id: orgId }, updateOrgDto)
      .exec();
    if (!updatedOrg) {
      throw new NotFoundException(`Business with ID ${orgId} not found`);
    }
    return updatedOrg;
  }

  async delete(orgId: string) {
    const updatedOrg = await this.orgModel
      .findOneAndDelete({ _id: orgId })
      .exec();
  }
}
