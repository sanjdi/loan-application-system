import { Optional } from "@nestjs/common";
import { IsDefined, IsInt, IsString } from "class-validator";

export class UpdateOrgDto {
  @IsString({ message: 'Org Name should be a valid string' })
  id?: string;

  @IsString({ message: 'Founded Year should be a valid string' })
  @IsDefined({ message: 'Founded Year cannot be null' })
  readonly founded: string;
}
