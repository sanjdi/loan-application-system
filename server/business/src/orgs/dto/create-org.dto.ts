import { Optional } from "@nestjs/common";
import { IsDefined, IsInt, IsString } from "class-validator";

export class CreateOrgDto {
  @IsString({ message: 'Org Name should be a valid string' })
  @IsDefined({ message: 'Org Name cannot be null' })
  readonly name: string;

  @IsString({ message: 'Founded Year should be a valid string' })
  @IsDefined({ message: 'Founded Year cannot be null' })
  readonly founded: string;

  @IsString({ message: 'Owner Id should be a valid string' })
  readonly owner_id?: string;
}
