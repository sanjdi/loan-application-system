import { Optional } from "@nestjs/common";
import { IsDefined, IsInt, IsString } from "class-validator";

export class UpdateCompanyDto {
  @IsString({ message: 'Founded Year should be a valid string' })
  @IsDefined({ message: 'Founded Year cannot be null' })
  readonly founded: string;
}
